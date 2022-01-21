//-------------------APIAuth-----------------------------
const APIKEYS = require('../apikeys');

//--------------------imports-------------------------
const client = require('twilio')(APIKEYS.TWILIOSID, APIKEYS.TWILIOAUTHTOKEN);
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(APIKEYS.SENDGRIDAPIKEY);
//------------------Models------------------------------
const HttpError = require('../models/http-error');
const User = require('../models/user-model');
const ToDoItem = require('../models/toDoItem-model');


//-----------------------Controllers------------------
const createItem = async(req,res,next)=>{ //dont need to check for duplicates because they are ok
    res.status(201).json({message:"test"}.toObject({getters:true}))
}

const editItem = async(req,res,next)=>{
    res.status(201).json({message:"test"}.toObject({getters:true}))
}

const deleteItem = async(req,res,next)=>{
    res.status(201).json({message:"test"}.toObject({getters:true}))
}
const getItem = async(req,res,next)=>{
    res.status(201).json({message:"test"}.toObject({getters:true}))

}
const moveItem = async(req,res,next)=>{
    res.status(201).json({message:"test"}.toObject({getters:true}))
}
const shareItem = async(req,res,next)=>{
    res.status(201).json({message:"test"}.toObject({getters:true}))
}
const acceptPendingSharedItem = async(req,res,next)=>{
    res.status(201).json({message:"test"}.toObject({getters:true}))
}
const getPendingSharedItems = async(req,res,next)=>{
    res.status(201).json({message:"test"}.toObject({getters:true}))
}
const transferCreator = async(req,res,next)=>{
    res.status(201).json({message:"test"}.toObject({getters:true}))
}
const createCategory = async(req,res,next)=>{
    const{uid, name, icon}= req.body;

    //Find User
    let user = await getUser(uid,next); 
    
    const category = {
        name,
        icon,
        toDoList:[]
    }
    user.toDoCategories.push(category);


    res.status(201).json({message:"test"}.toObject({getters:true}))
}

const renameCategory = async(req,res,next)=>{
    res.status(201).json({message:"test"}.toObject({getters:true}))
}
const deleteCategory = async(req,res,next)=>{    
    res.status(201).json({message:"test"}.toObject({getters:true}))
}
const getCategory = async(req,res,next)=>{
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
