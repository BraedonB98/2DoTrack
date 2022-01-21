const express = require('express');
const { check } = require('express-validator');


const toDoController = require('../controllers/user-controller');

const router = express.Router();


//router.post('/createitem',
    //[check('email').normalizeEmail().isEmail()],
      //  toDoController.createItem)





module.exports = router;