//------------------Models------------------------------
const HttpError = require("../models/http-error");
const User = require("../models/user-model");
const userController = require("../controllers/user-controller");
const getUserById = userController.getUserById;
//-----------------------Controllers------------------
const getByName = async (req, res, next) => {
  const name = req.params.name;
  let searchedUser;
  try {
    searchedUser = await User.findOne({ name: name });
  } catch (error) {
    return next(new HttpError("Login Failed,Could not access database", 500));
  }
  if (!searchedUser) {
    return next(new HttpError("Could not find user with that name", 404));
  }
  res.status(200).json({ uid: searchedUser._id });
};

const getByEmail = async (req, res, next) => {
  const email = req.params.email;
  let searchedUser;
  try {
    searchedUser = await User.findOne({ email: email });
  } catch (error) {
    return next(new HttpError("Login Failed,Could not access database", 500));
  }
  if (!searchedUser) {
    return next(new HttpError("Could not find user with that email", 404));
  }
  res.status(200).json({ uid: searchedUser._id });
};
const getByPhoneNumber = async (req, res, next) => {
  const phoneNumber = req.params.phoneNumber;
  let searchedUser;
  try {
    searchedUser = await User.findOne({ phoneNumber: phoneNumber });
  } catch (error) {
    return next(new HttpError("Login Failed,Could not access database", 500));
  }
  if (!searchedUser) {
    return next(
      new HttpError("Could not find user with that phone number", 404)
    );
  }
  res.status(200).json({ uid: searchedUser._id });
};

const getById = async (req, res, next) => {
  const uid = req.params.uid;
  let user;
  if (uid === null) {
    new HttpError("no uid provided", 400);
  }
  try {
    user = await getUserById(uid);
    if (!!user.error) {
      return new HttpError(user.errorMessage, user.errorCode);
    }
  } catch (error) {
    return new HttpError("could not locate user", 404);
  }
  const userRestricted = {
    name: user.name,
    _id: user._id,
    imageUrl: user.imageUrl,
  };
  res.status(200).json({ user: userRestricted });
};

const getUsersSearch = async (req, res, next) => {
  //dont want to let people search by phone number to prevent giving out personal info
  const search = req.params.search;
  let users = [];
  //checking if email
  if (search.includes("@")) {
    //search by email
    try {
      const user = await User.findOne({ email: email });
      const userRestricted = {
        name: user.name,
        _id: user._id,
        imageUrl: user.imageUrl,
      };
      users.push(userRestricted);
    } catch (error) {
      return next(new HttpError("Login Failed,Could not access database", 500));
    }
    if (!users) {
      return next(new HttpError("Could not find user with that email", 404));
    }
  }
  //else search by name
  else {
    try {
      users = await User.find({ name: { $regex: search, $options: "i" } })
        .limit(100)
        .sort({ name: -1 })
        .select({ name: 1, imageUrl: 1, _id: 1 }); //Limit of 100 users from the search, may want to add .sort()later
    } catch (error) {
      return next(new HttpError("Login Failed,Could not access database", 500));
    }
    if (!users) {
      return next(new HttpError("Could not any users with that name", 404));
    }
  }

  res.status(200).json({ users: users });
};

//---------------------Exports--------------------------
exports.getByName = getByName;
exports.getByEmail = getByEmail;
exports.getByPhoneNumber = getByPhoneNumber;
exports.getUsersSearch = getUsersSearch;
exports.getById = getById;
