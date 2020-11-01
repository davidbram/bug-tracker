const express = require('express');

const _ = require('lodash');

const path = require('path');

const PORT = 3001;

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/bugTrackerDB', { useUnifiedTopology: true, useNewUrlParser: true });

const bugSchema = new mongoose.Schema({
  name: String,
  details: String,
  steps: String,
  version: String,
  priority: String,
  assigned: String,
  creator: String,
  time: String,
});

const Bug = mongoose.model('Bug', bugSchema);

app.route('')

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
