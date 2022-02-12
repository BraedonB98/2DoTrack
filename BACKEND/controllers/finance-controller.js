//--------------------imports-------------------------
const mongoose = require("mongoose");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SendGridApi_Key);

//------------------Modules--------------------------
const userController = require("../controllers/user-controller");
const getUserById = userController.getUserById;
//------------------Models------------------------------
const HttpError = require("../models/http-error");
const Transaction = require("../models/transaction-model");

//-----------------------HelperFunctions-----------------------

//----------------------Controllers-------------------------
const createTransaction = async (req, res, next) => {
  const { cid, name, rec, amount, aid, notes } = req.body; //aid = account id
  const uid = req.userData._id;
  let user = await getUserById(uid);
  //Getting user, category, and accounts
  if (!!user.error) {
    return next(new HttpError(user.errorMessage, user.errorCode));
  }
  let category = user.financeCategories.filter(
    (category) => category.name === cid
  )[0];
  if (!category) {
    return next(new HttpError("Category not found", 422));
  }
  let account = user.financeAccounts.filter(
    (account) => account.account === aid
  )[0];
  if (!account) {
    return next(new HttpError("Account not found", 422));
  }

  //Create Transaction

  const newTransaction = new Transaction({
    name,
    recurring: rec,
    amount,
    date: new Date(),
    notes,
    category: cid,
    creator: uid,
  });
  //Save user and transaction
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newTransaction.save({ session: sess });
    category.transactionList.push(newTransaction);
    account.transactionList.push(newTransaction);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (error) {
    console.log(error);
    return next(
      new HttpError("Could not update user or item in database", 500)
    );
  }

  res.status(201).json({ transaction: newTransaction });
};

const editTransaction = async (req, res, next) => {};

const deleteTransaction = async (req, res, next) => {};

const getTransaction = async (req, res, next) => {};

const createCategory = async (req, res, next) => {
  const { name, icon } = req.body;
  const uid = req.userData._id;
  if (!name) {
    return next(new HttpError("Please Select a valid name", 422));
  }
  if (!icon) {
    return next(new HttpError("Please Select a valid icon", 422));
  }
  //Find User
  let user = await getUserById(uid);
  if (!!user.error) {
    return next(new HttpError(user.errorMessage, user.errorCode));
  }

  if (
    user.financeCategories.filter((category) => category.name === name)
      .length !== 0
  ) {
    return next(new HttpError("Category name already exists", 422));
  }

  const category = {
    name,
    icon,
    transactionList: [],
  };
  user.financeCategories.push(category);

  try {
    await user.save();
  } catch (error) {
    console.log(error);
    return next(new HttpError("Could not update user in database", 500));
  }

  res.status(201).json({
    category: user.financeCategories[user.financeCategories.length - 1],
  });
};

const editCategory = async (req, res, next) => {};

const deleteCategory = async (req, res, next) => {};

const getCategory = async (req, res, next) => {};

const createAccount = async (req, res, next) => {
  const { name, icon, balance } = req.body;
  const uid = req.userData._id;
  if (!name) {
    return next(new HttpError("Please Select a valid name", 422));
  }
  if (!icon) {
    return next(new HttpError("Please Select a valid icon", 422));
  }
  if (!balance) {
    balance = 0; //if no balance requested assume 0
  }
  //Find User
  let user = await getUserById(uid);
  if (!!user.error) {
    return next(new HttpError(user.errorMessage, user.errorCode));
  }

  if (
    user.financeAccounts.filter((account) => account.name === name).length !== 0
  ) {
    return next(new HttpError("Account name already exists", 422));
  }

  const category = {
    name,
    balance,
    icon,
    transactionList: [],
  };
  user.financeAccounts.push(category);

  try {
    await user.save();
  } catch (error) {
    console.log(error);
    return next(new HttpError("Could not update user in database", 500));
  }

  res
    .status(201)
    .json({ category: user.financeAccounts[user.financeAccounts.length - 1] });
};

const editAccount = async (req, res, next) => {};

const deleteAccount = async (req, res, next) => {};

const getAccount = async (req, res, next) => {};

//----------------------Exports--------------------------------
exports.createTransaction = createTransaction;
exports.editTransaction = editTransaction;
exports.deleteTransaction = deleteTransaction;
exports.getTransaction = getTransaction;

exports.createCategory = createCategory;
exports.editCategory = editCategory;
exports.deleteCategory = deleteCategory;
exports.getCategory = getCategory;

exports.createAccount = createAccount;
exports.editAccount = editAccount;
exports.deleteAccount = deleteAccount;
exports.getAccount = getAccount;
