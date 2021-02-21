const catchAsync = require('./../utils/catchAsync');
const Weight = require('../models/weightModel');
const User = require('./../models/userModel');

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {});
};

exports.getHome = catchAsync(async (req, res) => {
  const userData = await Weight.findOne({ user: req.user.id }).exec();

  if (req.user.role === 'admin') {
    const users = await User.find();
    res.status(200).render('admin', {
      users: users,
    });
  } else {
    if (userData === null) {
      res.status(200).render('home', {
        h1: 'Logged in as: ' + req.user.Fname + ' ' + req.user.Lname,
        fname: req.user.Fname,
        lname: req.user.Lname,
      });
    } else {
      let updatedAt = Date;
      if (!userData.updatedAt) {
        updatedAt = userData.createdAt;
      } else {
        updatedAt = userData.updatedAt;
      }

      res.status(200).render('home', {
        h1: 'Logged in as: ' + req.user.Fname + ' ' + req.user.Lname,
        weights: userData.weightData,
        goalWeight: userData.goalWeight,
        updatedAt:
          'Last weight update at:  ' + updatedAt.toISOString().split('T')[0],
        fname: req.user.Fname,
        lname: req.user.Lname,
      });
    }
  }
});
