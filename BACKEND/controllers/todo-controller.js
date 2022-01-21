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
const ToDoItem = require('../models/toDoItem-model');

//-----------------------Controllers------------------
const createItem = async(req,res,next)=>{
    res.status(201).json({message:"test"}.toObject({getters:true}))
}

const editItem = (req,res,next)=>{
    res.status(201).json({message:"test"}.toObject({getters:true}))
}

const deleteItem = (req,res,next)=>{
    res.status(201).json({message:"test"}.toObject({getters:true}))
}
const getItem = (req,res,next)=>{
    res.status(201).json({message:"test"}.toObject({getters:true}))

}
const moveItem = (req,res,next)=>{
    res.status(201).json({message:"test"}.toObject({getters:true}))
}
const shareItem = (req,res,next)=>{
    res.status(201).json({message:"test"}.toObject({getters:true}))
}
const acceptPendingSharedItem = (req,res,next)=>{
    res.status(201).json({message:"test"}.toObject({getters:true}))
}
const getPendingSharedItems = (req,res,next)=>{
    res.status(201).json({message:"test"}.toObject({getters:true}))
}
const transferCreator = (req,res,next)=>{
    res.status(201).json({message:"test"}.toObject({getters:true}))
}
const createCategory = (req,res,next)=>{
    res.status(201).json({message:"test"}.toObject({getters:true}))
}
const renameCategory = (req,res,next)=>{
    res.status(201).json({message:"test"}.toObject({getters:true}))
}
const deleteCategory = (req,res,next)=>{    
    res.status(201).json({message:"test"}.toObject({getters:true}))
}
const getCategory = (req,res,next)=>{
    res.status(201).json({message:"test"}.toObject({getters:true}))
}


//---------------------Exports--------------------------
exports.createItem = createItem;//yes I realize this could be called task but im commited now
exports.editItem = editItem;
exports.deleteItem = deleteItem;
exports.getItem = getItem;

exports.moveItem = moveItem;

exports.shareItem = shareItem;
exports.acceptPendingSharedItem = acceptPendingSharedItem;
exports.getPendingSharedItems =getPendingSharedItems;
exports.transferCreator = transferCreator;

exports.createCategory = createCategory;
exports.renameCategory = renameCategory;
exports.deleteCategory = deleteCategory;
exports.getCategory = getCategory;
