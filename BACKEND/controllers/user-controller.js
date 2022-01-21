//-------------------APIAuth-----------------------------
const APIKEYS = require('../apikeys');

//--------------------imports-------------------------
const {validationResult} = require('express-validator');
const client = require('twilio')(APIKEYS.TWILIOSID, APIKEYS.TWILIOAUTHTOKEN);
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(APIKEYS.SENDGRIDAPIKEY);
//------------------Models------------------------------
const HttpError = require('../models/http-error');
const User = require('../models/user-model');

//-----------------------Controllers------------------
const createUser = async (req,res,next)=>{
    //Checking valid inputs
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return(next(new HttpError('Invalid Inputs Passed found by expressValidator Please try again', 422)))
    }
    const{name, email,phoneNumber, password }= req.body;

    //Checking if user already has account
    let existingUser; 
    try{
       existingUser = await User.findOne({email:email});
       existingUser = await User.findOne({phoneNumber:phoneNumber});
    }
    catch(error){
        return(next(new HttpError('Sign up failed, Could not access database', 500)));
    };
    if(existingUser){
        return(next(new HttpError('Could not create user, email already in use'),422));
    }

    //Creating new user
    const createdUser = new User({
        name,
        subscription:"noSub",
        imageUrl:"../uploads/images/2DoFinanceLogo.png",
        email,
        phoneNumber,
        password,
        preferences:{
            notificationTime:0,
            notificationType:"None",
            notificationToDo:false,
            notificationFinance:false,
        },
        toDoCatagories:[],
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
            to: `+1${createdUser.phoneNumber}`
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
        try{
            existingUser = await User.findOne({email:email});
        }
        catch(error){return(next(new HttpError('Login Failed,Could not access database', 500)));}
    }
    if(!email){
        try{
            existingUser = await User.findOne({phoneNumber:phoneNumber})
        }
         catch(error){return(next(new HttpError('Login Failed,Could not access database', 500)));}    
    }   
    //Checking Passwords
    if(!existingUser || existingUser.password !== password){
        return(next(new HttpError('Login Failed,invalid credentials', 401)));
    }
    res.json({message: 'Logged in!' , user: existingUser.toObject({getters:true})})
}

const photoUpload = async(req,res,next)=>{
    //getting params from url
    const uid = req.params.uid;
    
    //checking for errors
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return(next(new HttpError('Invalid Inputs Passed Please try again', 422)))
    } 
    
    //getting user from DB
    let user;
    try{
        user = await User.findById(uid);
    }
    catch(error){
        return(next(new HttpError('Could not find place in database', 500)));
    };
    if(!user){
        return(next(new HttpError('User not in database', 404)));
    }
    

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
    //checking for errors
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return(next(new HttpError('Invalid Inputs Passed Please try again', 422)))
    } 
        
    //getting user from DB
    let user;
    try{
        user = await User.findById(uid);
    }
    catch(error){
        return(next(new HttpError('Could not find user in database', 500)));
    };
    if(!user){
        return(next(new HttpError('User not in database', 404)));
    }
    res.status(200).json({preferences: user.preferences.toObject({getters:true})});
}
const updatePreferences = async (req,res,next)=>{
        //getting params from url
        const uid = req.params.uid;
        const {preferences}= req.body;
        //checking for errors
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
            return(next(new HttpError('Invalid Inputs Passed Please try again', 422)))
        } 
            
        //getting user from DB
        let user;
        try{
            user = await User.findById(uid);
        }
        catch(error){
            return(next(new HttpError('Could not find user in database', 500)));
        };
        if(!user){
            return(next(new HttpError('User not in database', 404)));
        }
        user.preferences= preferences;
        try{
            
            await user.save();
        }
        catch(error){
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