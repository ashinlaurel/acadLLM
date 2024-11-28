const express = require('express');
const router = express.Router();
const { createLecture,uploadPDF, searchPDFs, getLecturesForCourse, getPDFsForLecture } = require('../controllers/lectureController');

router.post('/create', createLecture);
router.post('/upload', uploadPDF);
router.post('/search', searchPDFs);
router.post('/getLectures', getLecturesForCourse);
router.get('/getPDFs/:lectureId', getPDFsForLecture);

module.exports = router;
