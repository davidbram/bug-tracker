require('dotenv').config();


const express = require('express');


// const _ = require('lodash');

const PORT = process.env.PORT || 3001;

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json())
const cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/bugTrackerDB', { useUnifiedTopology: true, useNewUrlParser: true });

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

// / crud operations on all bugs ///

app.route('/bug')

.get((req, res) => {
  Bug.find({}, (err, foundBugs) => {
    if (!err) {
      if (foundBugs.length > 0) {
        res.send(foundBugs);
      } else {
        res.send('No bugs');
      }
    } else {
      res.send(err);
    }
  });
})

.post((req, res) => {
  var d = new Date()
  //console.log(req);
  const bug = new Bug({
    name: req.body.name,
    details: req.body.details,
    steps: req.body.steps,
    version: req.body.version,
    priority: req.body.priority,
    assigned: req.body.assigned,
    creator: req.body.creator,
    time: d.toDateString()+" "+d.getHours()+" "+d.getMinutes(),
    status: "open",
  });
  //console.log(bug);
  bug.save((err) => {
    if (!err) {
      res.send('Successfully saved bug in DB');
    } else {
      res.send(err);
    }
  });
})

.delete((req, res) => {
  Bug.deleteMany({}, (err) => {
    if (!err) {
      res.send('Deleted all bugs');
    } else {
      res.send(err);
    }
  },
  );
});
// / crud operations on specific bug ///

app.route('/bug/:bugName')

.get((req, res) => {
  Bug.findOne({ name: req.params.bugName }, (err, foundBug) => {
    if (!err) {
      if (foundBug) {
        res.send(foundBug);
      } else {
        res.send('Bug not found');
      }
    } else {
      res.send(err);
    }
  });
})

.put((req, res) => {
  Bug.update(
    { name: req.params.bugName },
    {
      name: req.body.name,
      details: req.body.details,
      steps: req.body.steps,
      version: req.body.version,
      priority: req.body.priority,
      assigned: req.body.assigned,
      creator: req.body.creator,
      time: req.body.time,
      status: req.body.status,
    },
    { overwrite: true },
    (err) => {
      if (!err) {
        res.send(`${req.params.bugName} bug updated successfully `);
      } else {
        res.send(err);
      }
    },

  );
})

.patch((req, res) => {
  Bug.update(
    { name: req.params.bugName },
    { $set: req.body },
    (err) => {
      if (!err) {
        res.send(`${req.params.bugName} bug updated successfully `);
      } else {
        res.send(err);
      }
    },
  );
})

.delete((req, res) => {
  Bug.deleteOne(
  { name: req.params.bugName },
  (err) => {
    if (!err) {
      res.send(`${req.params.bugName} bug has been deleted successfully`);
    } else {
      res.send(err);
    }
  },
);
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
