const { Project } = require('../models/project');

exports.getAllProjects = (req, res) => {
  Project.find({}, (err, foundProjects) => {
    if (!err) {
      if (foundProjects.length > 0) {
        res.send(foundProjects);
      } else {
        res.send('No projects');
      }
    } else {
      res.send(err);
    }
  });
};

exports.createProject = (req, res) => {
  const d = new Date();
  const project = new Project({
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
  project.save((err) => {
    if (!err) {
      res.send('Successfully saved bug in DB');
    } else {
      res.send(err);
    }
  });
};

exports.deleteAllProjects = (req, res) => {
  Project.deleteMany({}, (err) => {
    if (!err) {
      res.send('Deleted all projects');
    } else {
      res.send(err);
    }
  },
  );
};


// / crud operations on specific project ///

exports.findSpecificProject = (req, res) => {
  Project.findOne({ _id: req.params.projectId }, (err, foundProject) => {
    if (!err) {
      if (foundProject) {
        res.send(foundProject);
      } else {
        res.send('Project not found');
      }
    } else {
      res.send(err);
    }
  });
};

exports.modifyProject = (req, res) => {
  Project.update(
    { _id: req.params.projectId },
    { $set: req.body },
    (err) => {
      if (!err) {
        res.send(`${req.params.projectId} project updated successfully `);
      } else {
        res.send(err);
      }
    },
  );
};

exports.deleteSpecificProject = (req, res) => {
  Project.deleteOne(
  { _id: req.params.projectId },
  (err) => {
    if (!err) {
      res.send(`${req.params.projectId} project has been deleted successfully`);
    } else {
      res.send(err);
    }
  },
);
};
