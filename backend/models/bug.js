const mongoose = require('mongoose');

const bugSchema = new mongoose.Schema({
  name: String,
  details: String,
  steps: String,
  version: String,
  priority: Number,
  assigned: String,
  creator: String,
  time: String,
  status: String,
});

const Bug = mongoose.model('Bug', bugSchema);

module.exports = { Bug };
