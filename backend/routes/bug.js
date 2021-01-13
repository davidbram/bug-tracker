const express = require('express');

const router = express.Router();
const {getAllBugs, createBug, deleteAllBugs, findSpecificBug, fullModifyBug, partialModifyBug, markComplete, deleteSpecificBug } = require('../controllers/bug');


router.get('/bug', getAllBugs);
router.post('/bug', createBug);
router.delete('/bug', deleteAllBugs);

router.get('/bug/:bugId', findSpecificBug);
router.put('/bug/:bugId', fullModifyBug);
router.patch('/bug/:bugId', partialModifyBug);
router.patch('/bug/complete/:bugId', markComplete);
router.delete('/bug/:bugId', deleteSpecificBug);

module.exports = router;
