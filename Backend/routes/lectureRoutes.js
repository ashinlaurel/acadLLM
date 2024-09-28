const express = require('express');
const router = express.Router();
const { createLecture,uploadPDF, searchPDFs } = require('../controllers/lectureController');

router.post('/create', createLecture);
router.post('/upload', uploadPDF);
router.post('/search', searchPDFs);

module.exports = router;
