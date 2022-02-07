const express = require("express");
const checkAuth = require("../middleware/check-auth");

const toDoController = require("../controllers/todo-controller");

const router = express.Router();

router.use(checkAuth); // every route after this requires an token

router.post("/createitem", [], toDoController.createItem);

router.patch("/edititem/:TDIID", [], toDoController.editItem);

router.delete("/deleteitem", [], toDoController.deleteItem);

router.get(
  "/getitem/:TDIID", //To DO Item ID maybe add different ways to get
  toDoController.getItem
);

router.get("/getitems/:uid/:cid", toDoController.getItems);

router.patch("/moveitem", [], toDoController.moveItem);

router.patch("/shareItem", [], toDoController.shareItem);

router.patch("/transferItem", [], toDoController.transferCreator);

router.patch(
  "/acceptPendingSharedItem",
  [],
  toDoController.acceptPendingSharedItem
);

router.patch(
  "/dismissPendingSharedItem",
  [],
  toDoController.dismissPendingSharedItem
);

router.get("/getPendingSharedItems/:uid", toDoController.getPendingSharedItems);

router.post("/createcategory", [], toDoController.createCategory);

router.patch("/renamecategory", [], toDoController.renameCategory);

router.patch("/changecategoryicon", [], toDoController.changeCategoryIcon);

router.delete("/category", [], toDoController.deleteCategory);

router.get(
  "/category/:uid/:cid", //category name
  toDoController.getCategory
);

router.get("/categories/:uid/", toDoController.getCategories);

module.exports = router;
