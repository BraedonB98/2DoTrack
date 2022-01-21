const express = require('express');



const userController = require('../controllers/user-controller');
const fileUpload = require('../middleware/file-upload');

const router = express.Router();


router.post('/createuser',  userController.createUser)

router.post('/login',userController.login)

router.patch('/:uid/info/photo',fileUpload.single('image'),
    userController.photoUpload)

router.patch('/:uid/info/preferences',userController.updatePreferences)

router.get('/:uid/info/preferences',userController.getPreferences)



module.exports = router;