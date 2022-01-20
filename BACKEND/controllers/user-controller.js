//--------------------imports-------------------------
const {validationResult} = require('express-validator');

//------------------Models------------------------------
const HttpError = require('../models/http-error');
const User = require('../models/user-model');

//-------------------Helper Functions-----------------


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
        return(next(new HttpError('Place not in database', 404)));
    }
    user.imageUrl =



    res.json({user: user.toObject({getters:true})});
}
const getPreferences = (req,res,next)=>{
    res.json({user:"test"});
}
const updatePreferences = (req,res,next)=>{
    res.status(201).json({user:"test"})
}

//---------------------Exports--------------------------
exports.createUser = createUser;
exports.login = login;
exports.photoUpload = photoUpload;
exports.getPreferences = getPreferences;
exports.updatePreferences = updatePreferences;