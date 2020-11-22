const express = require('express');

const router = express.Router();
const { getAllBugs, createBug, deleteAllBugs, findSpecificBug, fullModifyBug, partialModifyBug, deleteSpecificBug } = require('../controllers/bug');


router.get('/bug', getAllBugs);
router.post('/bug', createBug);
router.delete('/bug', deleteAllBugs);

router.get('/bug/:bugName', findSpecificBug);
router.put('/bug/:bugName', fullModifyBug);
router.patch('/bug/:bugName', partialModifyBug);
router.delete('/bug/:bugName', deleteSpecificBug);

module.exports = router;
