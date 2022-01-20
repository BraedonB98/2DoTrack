const express = require('express');
const { check } = require('express-validator');


const userController = require('../controllers/user-controller');


const router = express.Router();


router.post('/createuser',
    [check('email').normalizeEmail().isEmail(),
    check('password').isLength({min:5}) , 
    check('name').not().isEmpty() ], 
        userController.createUser)

router.post('/login',[],
    userController.login)

router.patch('/:uid/info/photo',
    userController.photoUpload)

router.get('/:uid/info/preferences',
    userController.getPreferences)

router.patch('/:uid/info/preferences',
    userController.getPreferences)

module.exports = router;