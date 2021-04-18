const express = require('express');

const router = express.Router();
const { getAllProjects, createProject, deleteAllProjects, findSpecificProject, modifyProject, deleteSpecificProject } = require('../controllers/project');

router.get('/project', getAllProjects);
router.post('/project', createProject);
router.delete('/project', deleteAllProjects);

router.get('/project/:projectId', findSpecificProject);
router.patch('/project/:projectId', modifyProject);
router.delete('/project/:projectId', deleteSpecificProject);

module.exports = router;
