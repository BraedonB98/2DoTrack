const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: {type:String, required:true},
    //id
    subscription: {type:String, required:true},
    imageUrl:{type:String, required:true},
    email: {type:String, required:true, unique:true}, //unique makes searching faster but has to be unique
    phoneNumber: {type:String, required:true,minLength: 10,  unique:true}, 
    password:{type:String, required:true , minLength: 5},
    preferences:{
        notificationTime:{type:number, required:true},
        notificationType:{type:String, required:true},
        notificationToDo:{type:Boolean, required:true},
        notificationFinance:{type:Boolean, required:true}
        },
    //places:[{type:mongoose.Types.ObjectId,required:true, ref: 'Place'}]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User',userSchema);