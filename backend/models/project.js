const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  bug: {
    type: ObjectId,
    ref: 'Bug',
  },
  user: {
    type: ObjectId,
    ref: 'User',
  },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = { Project };
