const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//for recurring payments make a copy of payment and add it to new transaction object and add it to the list
const transactionSchema = new Schema({
    name: {type:String, required:true},
    //ID
    recurring:{
        time: {type:Number, required:false},//not all transactions are recurring
        account: {type:String, required:false},//not all transactions are recurring
        category: {type:String, required:false},//not all transactions are recurring
    },
    amount: {type:Number, required:true},//Profit = Positive, Negative = Deficit 
    date:{type:Number,required:true},
    notes:{type:String, required:false},
    color:{type:String,required:true},
    address:{type:String,required:false},
    location:{
        lat: {type:Number, required:false},
        lng: {type:Number, required:false}
    }
});


module.exports = mongoose.model('Transaction',transactionSchema);