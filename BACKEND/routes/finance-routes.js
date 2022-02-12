const express = require("express");
const checkAuth = require("../middleware/check-auth");

const financeController = require("../controllers/finance-controller");

const router = express.Router();

router.use(checkAuth); // every route after this requires an token

router.post("/createtransaction", [], toDoController.createTransaction);

router.patch("/editTransaction/", [], toDoController.editTransaction);

router.delete("/deleteTransaction", [], toDoController.deleteTransaction);

router.get("/getTransaction/", toDoController.getTransaction);

//create transaction
//edit transaction
//delete transaction
//get transaction
//edit category
//create category
//delete category
//get category
//create account
//edit account
//delete account
//get account
