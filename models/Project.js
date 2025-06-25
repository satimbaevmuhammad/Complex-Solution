const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  img: { type: String, required: true },
  name: { type: String, required: true },
  about: { type: String, required: true },
  advantages: { type: String, required: true },
  newFeature: { type: String, required: true },
  link: { type: String, required: true },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Project', projectSchema);
