const express = require("express");

const uidController = require("../controllers/uid-controller");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

//this will allow users to later search for eachother to add to tasks without getting entire user object

router.use(checkAuth); // every route after this requires an token

router.get("/name/:name", uidController.getByName);

router.get("/email/:email", uidController.getByEmail);

router.get("/phonenumber/:phoneNumber", uidController.getByPhoneNumber);

router.get("/userssearch/:search", uidController.getUsersSearch);

router.get("/user/:uid", uidController.getById);

module.exports = router;
