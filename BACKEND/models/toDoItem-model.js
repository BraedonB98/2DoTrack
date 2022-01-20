const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//for recurring payments make a copy of payment and add it to new transaction object and add it to the list
const toDoItemSchema = new Schema({
    name: {type:String, required:true},
    //ID
    recurring:{
        time: {type:Number, required:false},//not all transactions are recurring
        category: {type:String, required:false},//not all transactions are recurring
    },
    status: {type:String, required:true},//Profit = Positive, Negative = Deficit 
    due:{
        date:{type:Number,required:false},
        time:{type:Number,required:false}
    },
    priority:{type:Number, required:true},
    address:{type:String,required:false},
    location:{
        lat: {type:Number, required:false},
        lng: {type:Number, required:false}
    },
    notes:{type:String, required:true},
    creator:{type:mongoose.Types.ObjectId, required:true, ref: 'User'},
    users:[{type:mongoose.Types.ObjectId, required:true, ref: 'User'}]
});


module.exports = mongoose.model('ToDoItem',toDoItemSchema);