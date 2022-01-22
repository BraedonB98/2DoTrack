//-------------------APIAuth-----------------------------
const APIKEYS = require('../apikeys');

//--------------------imports-------------------------
const client = require('twilio')(APIKEYS.TWILIOSID, APIKEYS.TWILIOAUTHTOKEN);
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(APIKEYS.SENDGRIDAPIKEY);
//------------------Models------------------------------
const HttpError = require('../models/http-error');
const User = require('../models/user-model');

//----------------------HelperFunction------------------
const getUserById = async(uid) =>{
    let user
    try{
        user = await User.findById(uid);
    }
    catch(error){
        return({error:error,errorMessage:'Could not find user in database',errorCode:500})
    };
    if(!user){
        return({error:error,errorMessage:'User not in database',errorCode:404})
    }
    return(user);
}

const getUserByProp = async(prop,value) =>{
    let user
    try{
        user = await User.findOne({[prop]:value});//dynamic property
    }
    catch(error){
        return({error:{message:`Accessing database failed`, code:500}})
    };
    if(!user){
        return({error:{message:`Could not locate ${prop} in database`, code:404}})
    }
    return(user);
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
        imageUrl:"../uploads/images/2DoFinanceLogo.png",
        email,
        phoneNumber:('+1'+phoneNumber),
        password,
        preferences:{
            notificationTime:0,
            notificationType:"None",
            notificationToDo:false,
            notificationFinance:false,
        },
        toDoCategories:[],
        recurringTasks:[],
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
            from: APIKEYS.TWILIOPHONENUMBER,
            to: `${createdUser.phoneNumber}`
        })
        .then(message => console.log(message.sid));
    
    //Email Notification with SendGrid(twilio)
    const msg = {
        to: createdUser.email,
        from: APIKEYS.SENDGRIDEMAIL, 
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
        if(!!existingUser.error){return(next(new HttpError(existingUser.error.message, existingUser.error.code)))}
    }
    if(!email){
        existingUser=await getUserByProp ('phoneNumber',phoneNumber);
        if(!!existingUser.error){return(next(new HttpError(existingUser.error.message, existingUser.error.code)))}
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
    if(!!user.error){return(next(new HttpError(user.error.message, user.error.code)))}
    

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
        if(!!user.error){return(next(new HttpError(user.error.message, user.error.code)))}

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
