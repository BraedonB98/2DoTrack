const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//for recurring payments make a copy of payment and add it to new transaction object and add it to the list
const toDoItemSchema = new Schema({
    name: {type:String},
    //ID
    recurring:{
        time: {type:Number},//not all transactions are recurring
        category: {type:String},//not all transactions are recurring
    },
    status: {type:String},//Profit = Positive, Negative = Deficit 
    due:{
        date:{type:Number},
        time:{type:Number}
    },
    priority:{type:Number},
    address:{type:String},
    location:{
        lat: {type:Number},
        lng: {type:Number}
    },
    notes:{type:String, required:true},
    creator:{type:mongoose.Types.ObjectId,  ref: 'User'},
    users:[{type:mongoose.Types.ObjectId,  ref: 'User'}]
});


module.exports = mongoose.model('ToDoItem',toDoItemSchema);