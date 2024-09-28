const express = require('express');
const { createCourse, getAll } = require('../controllers/courseController');
const router = express.Router();

router.post('/create', createCourse);
router.post('/getAll', getAll);


module.exports = router;
