//--------------------imports-------------------------
const {validationResult} = require('express-validator');

//------------------Models------------------------------
const HttpError = require('../models/http-error');
const User = require('../models/user-model');

//-----------------------Controllers------------------
const createUser = (req,res,next)=>{
    res.status(201).json({user:"test"})
}
const login = (req,res,next)=>{
    res.status(201).json({user:"test"})
}

const photoUpload = (req,res,next)=>{
    res.status(201).json({user:"test"})
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