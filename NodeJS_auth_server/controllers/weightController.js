/* eslint-disable import/no-useless-path-segments */
const Weight = require('./../models/weightModel');
const catchAsync = require('./../utils/catchAsync');

exports.setIds = (req, res, next) => {
  req.body.user = req.user.id;
  next();
};

exports.getWeight = catchAsync(async (req, res, next) => {
  const userData = await Weight.findOne({ user: req.user.id }).exec();
  res.status(200).json({
    status: 'success',
    data: userData,
  });
});

exports.pushWeights = catchAsync(async (req, res, next) => {
  const weightData = req.body.weightData;
  console.log(weightData);
  const newData = await Weight.findOneAndUpdate(
    { user: req.user.id },
    { $push: { weightData }, updatedAt: Date.now() }
  ).exec();
  res.status(200).json({
    status: 'success',
  });
});

exports.updateWeights = catchAsync(async (req, res, next) => {
  const weightData = req.body.weightData;
  const newData = await Weight.findOneAndUpdate(
    { user: req.user.id },
    { weightData, updatedAt: Date.now() }
  ).exec();
  res.status(200).json({
    status: 'success',
    data: weightData,
  });
});

exports.updateGoalWeight = catchAsync(async (req, res, next) => {
  const goalWeight = req.body.goalWeight;
  const newData = await Weight.findOneAndUpdate(
    { user: req.user.id },
    { goalWeight: goalWeight }
  ).exec();
  res.status(200).json({
    status: 'success',
    data: goalWeight,
  });
});

exports.deleteWeights = catchAsync(async (req, res, next) => {
  const weightData = req.body.weightData;
  const delData = await Weight.findOneAndDelete({ user: req.user.id }).exec();
  res.status(201).json({
    status: 'success',
  });
});

exports.createWeight = catchAsync(async (req, res, next) => {
  const newWeight = await Weight.create({
    weightData: req.body.weightData,
    user: req.body.user,
  });

  res.status(200).json({
    status: 'success',
    data: newWeight,
  });
});
