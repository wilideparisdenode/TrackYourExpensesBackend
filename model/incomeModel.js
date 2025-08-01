const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    default: '',
  },
  source: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('Income', incomeSchema);