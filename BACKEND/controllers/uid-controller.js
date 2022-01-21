//------------------Models------------------------------
const HttpError = require('../models/http-error');
const User = require('../models/user-model');

//-----------------------Controllers------------------
const getByName = async (req,res,next)=>{
    const name = req.params.name;
    let searchedUser;
    try{
        searchedUser = await User.findOne({name:name});
    }
    catch(error){return(next(new HttpError('Login Failed,Could not access database', 500)));}
    if(!searchedUser)
    {
        return(next(new HttpError('Could not find user with that name', 404)));
    }
    res.status(200).json({uid: searchedUser._id});
}

const getByEmail = async (req,res,next)=>{
    const email = req.params.email;
    let searchedUser;
    try{
        searchedUser = await User.findOne({email:email});
    }
    catch(error){return(next(new HttpError('Login Failed,Could not access database', 500)));}
    if(!searchedUser)
    {
        return(next(new HttpError('Could not find user with that email', 404)));
    }
    res.status(200).json({uid: searchedUser._id});
}
const getByPhoneNumber = async (req,res,next)=>{
    const phoneNumber = req.params.phoneNumber;
    let searchedUser;
    try{
        searchedUser = await User.findOne({phoneNumber:phoneNumber});
    }
    catch(error){return(next(new HttpError('Login Failed,Could not access database', 500)));}
    if(!searchedUser)
    {
        return(next(new HttpError('Could not find user with that phone number', 404)));
    }
    res.status(200).json({uid: searchedUser._id});
}
//---------------------Exports--------------------------
exports.getByName = getByName;
exports.getByEmail = getByEmail;
exports.getByPhoneNumber = getByPhoneNumber;
