/* eslint-disable import/no-useless-path-segments */
const AppError = require('../utils/appError');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedFields) => {
  const newObject = {};
  Object.keys(obj).forEach((el) => {
    //for each key in object, if allowedFields includes key(el) => key of newObject = key of old object. (Only adds matches)
    if (allowedFields.includes(el)) newObject[el] = obj[el];
  });
  return newObject;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  //Create error if user POSTS password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword',
        400
      )
    );
  }
  //Filter out unwanted field names (password, role etc.)
  const filteredBody = filterObj(req.body, 'Fname', 'Lname', 'email');
  //Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

//Protected
exports.deleteMe = factory.deleteOne(User);
//Requires Admin role
exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User, { path: 'weightData' });
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
