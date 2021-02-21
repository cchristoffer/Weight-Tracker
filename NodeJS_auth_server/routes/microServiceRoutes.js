/* eslint-disable import/no-useless-path-segments */
const express = require('express');
const microServiceController = require('./../controllers/microServiceController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.get('/linear-regression', microServiceController.linearRegression);

module.exports = router;
