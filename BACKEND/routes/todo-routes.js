const express = require('express');


const toDoController = require('../controllers/todo-controller');

const router = express.Router();


router.post('/createitem',
    [],
    toDoController.createItem)

router.patch('/edititem/',
    [],
    toDoController.editItem)

router.delete('/deleteitem',
    [],
    toDoController.deleteItem)

router.get('/getitem/:TDIID',//To DO Item ID maybe add different ways to get
    toDoController.getItem)

router.patch('/moveitem',
    [],
    toDoController.moveItem)

router.patch('/shareItem',
    [],
    toDoController.shareItem)

router.patch('/acceptPendingSharedItem',
    [],
    toDoController.acceptPendingSharedItem)

router.get('/getPendingSharedItems',
    toDoController.getPendingSharedItems)

router.post('/createcategory',
    [],
    toDoController.createCategory)

router.patch('/renamecategory',
    [],
    toDoController.renameCategory)

router.get('/category/:uid/:cid',//category name
    toDoController.getCategory)

router.delete('/category',
    [],
    toDoController.deleteCategory)











module.exports = router;