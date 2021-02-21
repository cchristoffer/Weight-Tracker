const express = require('express');
const weightController = require('./../controllers/weightController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.route('/').get(weightController.setIds, weightController.getWeight);
//Push new data to weightData

router.route('/').post(weightController.setIds, weightController.createWeight);
//Push new data to weightData
router.route('/').patch(weightController.setIds, weightController.pushWeights);
//Updates weightData
router.route('/').put(weightController.setIds, weightController.updateWeights);
router
  .route('/goal')
  .patch(weightController.setIds, weightController.updateGoalWeight);
//Deletes weightData
router
  .route('/')
  .delete(weightController.setIds, weightController.deleteWeights);

module.exports = router;
