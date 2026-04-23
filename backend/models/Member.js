const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roll: { type: String, required: true },
  year: { type: String, required: true },
  degree: { type: String, required: true },
  project: { type: String },
  hobbies: { type: String },
  certificate: { type: String },
  internship: { type: String },
  aim: { type: String },
  image: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Member', memberSchema);