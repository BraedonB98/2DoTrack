const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const transactionSchema = new Schema({
    name: {type:String, required:true},
    
});


module.exports = mongoose.model('Transaction',transactionSchema);