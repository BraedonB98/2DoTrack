const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//------------------Models---------------------------
const HttpError = require('./models/http-error');

//-------------------API-----------------------------
const APIKEYS = require('./apikeys');

//------------------DataBase----------------------
const mongoUrl = `mongodb+srv://BraedonB98:${APIKEYS.MONGO}@plutus.nmh1i.mongodb.net/2DoFinance?retryWrites=true&w=majority`

//-------------------Instantiation---------------
const app = express();

//-------------------Routes-----------------------
//const financeRoutes = require('./routes/finance-routes');
//const todoRoutes = require('./routes/todo-routes');
//const uidRoutes = require('./routes/uid-routes');
const userRoutes = require('./routes/user-routes');

//-----------------MiddleWare--------------------
app.use(bodyParser.json());

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');//Access-control-Allow-Origin required to let browser use api, the the * can be replaced by urls (for the browser) that are allowed to use it
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')//Second values are what types of requests you want to accept
    next();
});

//-----------------Known Routes--------------------------
//app.use('/api/uid',uidRoutes); // /api/UID...
app.use('/api/user',userRoutes); // /api/user...
//app.use('/api/todo',todoRoutes); // /api/todo...
//app.use('/api/finance',financeRoutes); // /api/finance...


//-----------------Unknown Route Handling-------------------
app.use((req,res,next)=>{
    const error = new HttpError('Could not find this route.', 404);
    return(next(error));
});

//------------------Mongo------------------------
mongoose
.connect(mongoUrl)
.then(() =>{
    app.listen(5000);//start the whole server only if it can successfully connect to mongoose otherwise it wont open the port to receive connections
})
.catch(error =>{
    console.log(error);
});
