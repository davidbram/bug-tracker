const { Bug } = require('../models/bug');

exports.getAllBugs = (req, res) => {
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
};


exports.createBug = (req, res) => {
  const d = new Date();
  const bug = new Bug({
    name: req.body.name,
    details: req.body.details,
    steps: req.body.steps,
    version: req.body.version,
    priority: req.body.priority,
    assigned: req.body.assigned,
    creator: req.body.creator,
    time: `${d.toDateString()} ${d.getHours()}:${d.getMinutes()}`,
    status: 'open',
  });
  bug.save((err) => {
    if (!err) {
      res.send('Successfully saved bug in DB');
    } else {
      res.send(err);
    }
  });
};

exports.deleteAllBugs = (req, res) => {
  Bug.deleteMany({}, (err) => {
    if (!err) {
      res.send('Deleted all bugs');
    } else {
      res.send(err);
    }
  },
  );
};


// / crud operations on specific bug ///

exports.findSpecificBug = (req, res) => {
  Bug.findOne({ _id: req.params.bugId }, (err, foundBug) => {
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
};

exports.fullModifyBug = (req, res) => {
  Bug.update(
    { _id: req.params.bugId },
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
};

exports.partialModifyBug = (req, res) => {
  Bug.update(
    { _id: req.params.bugId },
    { $set: req.body },
    (err) => {
      if (!err) {
        res.send(`${req.params.bugName} bug updated successfully `);
      } else {
        res.send(err);
      }
    },
  );
};

exports.deleteSpecificBug = (req, res) => {
  Bug.deleteOne(
  { _id: req.params.bugId },
  (err) => {
    if (!err) {
      res.send(`${req.params.bugName} bug has been deleted successfully`);
    } else {
      res.send(err);
    }
  },
);
};
