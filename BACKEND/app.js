const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path"); //required for express static path for file accessing
//------------------Models---------------------------
const HttpError = require("./models/http-error");

//-------------------Instantiation---------------
const app = express();

//-------------------Routes-----------------------
const financeRoutes = require("./routes/finance-routes");
const todoRoutes = require("./routes/todo-routes");
const uidRoutes = require("./routes/uid-routes");
const userRoutes = require("./routes/user-routes");
const smsRoutes = require("./routes/sms-routes");

//-----------------MiddleWare--------------------
app.use(bodyParser.json());

app.use(
  "/data/frontEndRef/images",
  express.static(path.join("data", "frontEndRef", "images"))
);
app.use(
  "/data/uploads/images",
  express.static(path.join("data", "uploads", "images"))
);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //Access-control-Allow-Origin required to let browser use api, the the * can be replaced by urls (for the browser) that are allowed to use it
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE"); //Second values are what types of requests you want to accept
  next();
});

//-----------------Known Routes--------------------------
app.use("/api/uid", uidRoutes); // /api/UID...
app.use("/api/user", userRoutes); // /api/user...
app.use("/api/todo", todoRoutes); // /api/todo...
app.use("/api/finance", financeRoutes); // /api/finance...
//allows for a different body parser for sms so you can read messages
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/sms", smsRoutes);

//-----------------Unknown Route Handling-------------------
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  return next(error);
});

//------------------Image Delete Handling-----------------
app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({
    message: error.message || "An unknown error(imageHandling) occurred!",
  });
});

//------------------Mongo------------------------

mongoose
  .connect(
    `mongodb+srv://${process.env.MongoDB_User}:${process.env.MongoDB_Password}@${process.env.MongoDB_Server}/${process.env.MongoDB_DBName}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch((error) => {
    console.log(error);
  });
