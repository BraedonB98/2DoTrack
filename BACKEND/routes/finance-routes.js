const express = require("express");
const checkAuth = require("../middleware/check-auth");

const financeController = require("../controllers/finance-controller");

const router = express.Router();

router.use(checkAuth); // every route after this requires an token

router.post("/createtransaction", [], financeController.createTransaction);

router.patch("/edittransaction/", [], financeController.editTransaction);

router.delete("/deletetransaction", [], financeController.deleteTransaction);

router.get("/gettransaction/", financeController.getTransaction);

router.post("/createcategory", [], financeController.createCategory);

router.patch("/editcategory/", [], financeController.editCategory);

router.delete("/deletecategory", [], financeController.deleteCategory);

router.get("/getcategory/", financeController.getCategory);

router.post("/createaccount", [], financeController.createAccount);

router.patch("/editaccount/", [], financeController.editAccount);

router.delete("/deleteaccount", [], financeController.deleteAccount);

router.get("/getaccount/", financeController.getAccount);

module.exports = router;
