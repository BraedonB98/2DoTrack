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
        notificationTime:{type:Number, required:true},
        notificationType:{type:String, required:true},
        notificationToDo:{type:Boolean, required:true},
        notificationFinance:{type:Boolean, required:true}
        },
    toDoCatagories:[{
            name:{type:String,require:true},
            toDoList:[{type:mongoose.Types.ObjectId,required:true, ref: 'ToDoItem'}]
        }],
    recurringTasks:[{type:mongoose.Types.ObjectId,required:true, ref: 'ToDoItem'}], //may have some issue making shared enter recurring folder
    pendingSharedTasks:[{type:mongoose.Types.ObjectId,required:true, ref: 'ToDoItem'}], //could just make this a category but easier to be able to clear occasionally this way
    financeAccounts:[{
        account:{type:String,required:true},
        balance:{type:Number,required:true},
        financeCategories:[{
            category:{type:String},
            transactionList:[{type:mongoose.Types.ObjectId,required:true, ref: 'Transaction'}]
        }]
    }],
    recurringExpenses:[{type:mongoose.Types.ObjectId,required:true, ref: 'Transaction'}]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User',userSchema);