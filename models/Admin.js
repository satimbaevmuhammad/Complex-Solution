const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Admin', adminSchema);
