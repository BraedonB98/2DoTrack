const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//------------------Models---------------------------
const HttpError = require('./models/http-error');

//-------------------API-----------------------------
const APIKEYS = require('./apikeys');

//------------------DataBase----------------------
const mongoUrl = `mongodb+srv://BraedonB98:${APIKEYS.MONGO}@plutus.nmh1i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

//-------------------Instantiation---------------
const app = express();

//-----------------MiddleWare--------------------
app.use(bodyParser.json());



//------------------Mongo------------------------
mongoose
.connect(mongoUrl)
.then(() =>{
    app.listen(5000);//start the whole server only if it can successfully connect to mongoose otherwise it wont open the port to receive connections
})
.catch(error =>{
    console.log(error);
});
