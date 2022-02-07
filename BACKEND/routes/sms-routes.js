const express = require("express");

const smsController = require("../controllers/sms-controller");
const router = express.Router();
const checkConv = require("../middleware/check-conv");

router.use(checkConv); //check if previous conversation

router.post("/", [], smsController.smsManager);

module.exports = router;
