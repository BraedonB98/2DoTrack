//--------------------imports-------------------------
const accountSid = process.env.TwilioApi_SID;
const authToken = process.env.TwilioApi_Key;
const client = require('twilio')(accountSid, authToken);

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SendGridApi_Key);
//------------------Models------------------------------
const HttpError = require('../models/http-error');
const User = require('../models/user-model');

//----------------------HelperFunction------------------
const getUserById = async(uid) =>{
    let user
    if(typeof(uid) === 'string')
    {
        var ObjectID = require('mongodb').ObjectID
        uid = new ObjectID(uid);
    }
    try{
        user = await User.findById(uid);
    }
    catch(error){
        return({error:error,errorMessage:'Could not access user in database',errorCode:500})
    };
    if(!user){
        return({error:true,errorMessage:'User not in database',errorCode:404})
    }
    return(user);
}

const getUserByProp = async(prop,value) =>{
    let user
    try{
        user = await User.findOne({[prop]:value});//dynamic property
    }
    catch(error){
        return({error:error,errorMessage:`Accessing database failed`, errorCode:500})
    };
    if(!user){
        return({error:true,errorMessage:`Could not locate ${prop} in database`, errorCode:404})
    }
    return(user);
}

const userInDataBase = async(uid) =>{
    let user;
    try{
        user = await User.exists({ _id: uid })
    }
    catch(error){
        console.log(error)
        return({error:error, errorMessage:`Accessing database failed`, errorCode:500})
    }
    return(user)
}


//-----------------------Controllers------------------
const createUser = async (req,res,next)=>{
    const{name, email,phoneNumber, password }= req.body;

    //Checking if user already has account
    let existingUser; 
    try{
       existingUser = await User.findOne({email:email});
       if(!existingUser){
            existingUser = await User.findOne({phoneNumber:phoneNumber});
       }
       
    }
    catch(error){
        return(next(new HttpError('Sign up failed, Could not access database', 500)));
    };
    
    if(existingUser){
        return(next(new HttpError('Could not create user, credentials already in use'),422));
    }

    //Creating new user
    const createdUser = new User({
        name,
        subscription:"noSub",
        imageUrl:"data/uploads/images/default.svg",
        email,
        phoneNumber:('+1'+phoneNumber),
        password,
        preferences:{
            notificationTime:0,
            notificationType:"None",
            notificationToDo:false,
            notificationFinance:false,
        },
        toDoCategories:[{
            name:"To Do",
            icon:" ",
            toDoList:[]
        }],
        financeAccounts:[],
        recurringExpenses:[]
    });
    //Sending new user to DB
    try{
        await createdUser.save();
    }
    catch(error){
        return(next(new HttpError('Creating user failed',500)));
    };
    //SMS Notification with Twilio
    client.messages
        .create({
            body: `Welcome ${createdUser.name} to 2DoFinance! We are happy to have you!!!`,
            from: process.env.TwilioApi_PhonNumber,
            to: `${createdUser.phoneNumber}`
        })
        .then(message => console.log(message.sid));
    
    //Email Notification with SendGrid(twilio)
    const msg = {
        to: createdUser.email,
        from: process.env.SendGridApi_Email, 
        subject: 'Welcome to 2DoFinance!!!',
        text: `message`,
        html: (`<p>Welcome ${createdUser.name},</p> <p>to 2DoFinance! We are happy to have you!!! </p> <p>If this is a mistake please let us know,</p> <p> your friends at,</p><h2>2DoFinance<h2>`)
      }
      sgMail.send(msg)
        .then(() => {
            console.log(`Email to ${createdUser.email}`)
        })
        .catch((error) => {
            console.error(error)
        })


    res.status(201).json({user:createdUser.toObject({getters:true})})
}
const login = async (req,res,next)=>{
    const { email, phoneNumber, password }= req.body;
    //Locating User
    let existingUser;
    if(!phoneNumber){
        existingUser=await getUserByProp ('email',email);
        if(!!existingUser.error){return(next(new HttpError(existingUser.errorMessage, existingUser.errorCode)))}
    }
    if(!email){
        existingUser=await getUserByProp ('phoneNumber',phoneNumber);
        if(!!existingUser.error){return(next(new HttpError(existingUser.errorMessage, existingUser.errorCode)))}
    }   
    //Checking Passwords
    if( existingUser.password !== password){
        return(next(new HttpError('Login Failed,invalid credentials', 401)));
    }
    res.json({message: 'Logged in!' , user: existingUser.toObject({getters:true})})
}

const photoUpload = async(req,res,next)=>{
    //getting params from url
    const uid = req.params.uid;
    
    //getting user from DB
    let user = await getUserById(uid);
    if(!!user.error){return(next(new HttpError(user.errorMessage, user.errorCode)))}
    

    //save user with new image URL
    try{
         //if user is using default image
        if(user.imageUrl === "../uploads/images/2DoFinanceLogo.png"){ 
            user.imageUrl = req.file.path;
        }
        //Delete custom image uploads
        else{
            fs.unlink(user.imageUrl, err => {
            console.log(err);
        })
        user.imageUrl = req.file.path;
    }
        await user.save();
    }
    catch(error){
        return(next(new HttpError('Could not update photo in database', 500)));
    }


    res.json({user: user.imageUrl.toObject({getters:true})});
}
const getPreferences = async (req,res,next)=>{
    //getting params from url
    const uid = req.params.uid;
    
    //getting user from DB
    let user = await getUserById(uid);
    if(!!user.error){return(next(new HttpError(user.errorMessage, user.errorCode)))}
 

    res.status(200).json({preferences: user.preferences.toObject({getters:true})});
}
const updatePreferences = async (req,res,next)=>{
        //getting params from url
        const uid = req.params.uid;
        const {preferences}= req.body;

        //getting user from DB
        let user = await getUserById(uid);
        if(!!user.error){return(next(new HttpError(user.errorMessage, user.errorCode)))}

        user.preferences= preferences;
        try{
            await user.save();
        }
        catch(error){
            console.log(error);
            return(next(new HttpError('Could not update user in database', 500)));
        }
            
    
            
        res.status(200).json({preferences: user.preferences.toObject({getters:true})});
}

//---------------------Exports--------------------------
exports.createUser = createUser;
exports.login = login;
exports.photoUpload = photoUpload;
exports.getPreferences = getPreferences;
exports.updatePreferences = updatePreferences;
exports.getUserById = getUserById;
exports.getUserByProp = getUserByProp;
exports.userInDataBase = userInDataBase;
