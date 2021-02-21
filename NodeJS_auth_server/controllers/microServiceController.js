/* eslint-disable import/no-useless-path-segments */
const axios = require('axios');
const Weight = require('../models/weightModel');
const catchAsync = require('./../utils/catchAsync');
//const factory = require('./handlerFactory');

exports.linearRegression = catchAsync(async (req, res) => {
  const newData = await Weight.findOne({ user: req.user.id }).exec();
  const goal = newData.goalWeight;
  const data = newData.weightData;

  const currentWeight = data[data.length - 1];
  var copyOfCurrentWeight = currentWeight;

  const regressionMicroService = 'http://127.0.0.1:5000/linear-regression';

  axios
    .post(regressionMicroService, {
      weightData: data,
    })
    .then((response) => {
      let daysLeft = 0;
      const coef = parseFloat(response.data.coef);
      if (goal < copyOfCurrentWeight) {
        while (goal < copyOfCurrentWeight) {
          copyOfCurrentWeight += coef;
          daysLeft += 1;
        }
      } else {
        while (goal > copyOfCurrentWeight) {
          copyOfCurrentWeight -= coef;
          daysLeft += 1;
        }
      }
      response.data.daysLeft = daysLeft;
      response.data.goalWeight = goal;

      res.status(200).json({
        status: 'success',
        data: response.data,
      });
    });
});
