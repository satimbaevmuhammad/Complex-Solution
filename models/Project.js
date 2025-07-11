const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  img: { type: String, required: true },
  name: {
    en: { type: String, required: true },
    uz: { type: String, required: true },
    ru: { type: String, required: true }
  },
  about: {
    en: { type: String, required: true },
    uz: { type: String, required: true },
    ru: { type: String, required: true }
  },
  advantages: {
    en: { type: String, required: true },
    uz: { type: String, required: true },
    ru: { type: String, required: true }
  },
  newFeature: {
    en: { type: String, required: true },
    uz: { type: String, required: true },
    ru: { type: String, required: true }
  },
  link: { type: String, required: true }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Project', projectSchema);
