const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  income_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Income',
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  start_date: {
    type: Date,
    default: Date.now,
  },
  end_date: {
    type: Date,
    default: null,
  },
  description: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('Budget', budgetSchema); 