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
const createItem = (req,res,next)=>{}
const editItem = (req,res,next)=>{}
const deleteItem = (req,res,next)=>{}
const getItem = (req,res,next)=>{}
const moveItem = (req,res,next)=>{}
const shareItem = (req,res,next)=>{}
const acceptPendingSharedItems = (req,res,next)=>{}
const getPendingSharedItems = (req,res,next)=>{}
const createCategory = (req,res,next)=>{}
const renameCategory = (req,res,next)=>{}
const deleteCategory = (req,res,next)=>{}
const getCategory = (req,res,next)=>{}


//---------------------Exports--------------------------
exports.createItem = createItem;//yes I realize this could be called task but im commited now
exports.editItem = editItem;
exports.deleteItem = deleteItem;
exports.getItem = getItem;

exports.moveItem = moveItem;

exports.shareItem = shareItem;
exports.acceptPendingSharedItems = acceptPendingSharedItems;
exports.getPendingSharedItems =getPendingSharedItems;

exports.createCategory = createCategory;
exports.renameCategory = renameCategory;
exports.deleteCategory = deleteCategory;
exports.getCategory = getCategory;
