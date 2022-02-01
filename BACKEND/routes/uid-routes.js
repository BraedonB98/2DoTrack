const express = require('express');

const uidController = require('../controllers/uid-controller');

const router = express.Router();

//this will allow users to later search for eachother to add to tasks without getting entire user object
router.get('/name/:name', uidController.getByName)

router.get('/email/:email', uidController.getByEmail)

router.get('/phonenumber/:phoneNumber', uidController.getByPhoneNumber)

router.get('/userssearch/:search', uidController.getUsersSearch)




module.exports = router;