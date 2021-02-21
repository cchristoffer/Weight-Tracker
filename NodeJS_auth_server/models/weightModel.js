const mongoose = require('mongoose');

const weightSchema = new mongoose.Schema({
  weightData: [Number],
  goalWeight: Number,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Weight data must belong to a User!'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
});

const Weight = mongoose.model('Weight', weightSchema);

module.exports = Weight;
