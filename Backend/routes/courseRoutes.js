const express = require('express');
const { createCourse, getAll, getCourseById } = require('../controllers/courseController');
const router = express.Router();

router.post('/create', createCourse);
router.post('/getAll', getAll);
router.post('/getCourseById',getCourseById);


module.exports = router;
