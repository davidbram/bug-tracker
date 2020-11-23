const express = require('express');

const router = express.Router();
const { getAllBugs, createBug, deleteAllBugs, findSpecificBug, fullModifyBug, partialModifyBug, deleteSpecificBug } = require('../controllers/bug');


router.get('/bug', getAllBugs);
router.post('/bug', createBug);
router.delete('/bug', deleteAllBugs);

router.get('/bug/:bugId', findSpecificBug);
router.put('/bug/:bugId', fullModifyBug);
router.patch('/bug/:bugId', partialModifyBug);
router.delete('/bug/:bugId', deleteSpecificBug);

module.exports = router;
