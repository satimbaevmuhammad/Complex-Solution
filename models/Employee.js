const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  rasm: { type: String, required: true },
  fullname: { type: String, required: true },
  age: { type: Number, required: true },
  role: { type: String, required: true },
  ishStagi: { type: String, required: true },
  skills: { type: [String], required: true }
});

module.exports = mongoose.model('Employee', employeeSchema);
