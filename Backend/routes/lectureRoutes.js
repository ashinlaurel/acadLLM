const express = require('express');
const router = express.Router();
const { createLecture,uploadPDF, searchPDFs, getLecturesForCourse } = require('../controllers/lectureController');

router.post('/create', createLecture);
router.post('/upload', uploadPDF);
router.post('/search', searchPDFs);
router.post('/getLectures', getLecturesForCourse);

module.exports = router;
