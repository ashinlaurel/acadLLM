const express = require('express');
const router = express.Router();
const { uploadPDF, searchPDFs } = require('../controllers/lectureController');

// Route to upload PDF and save metadata
router.post('/upload', uploadPDF);

// Route to search PDFs based on FAISS vector index
router.post('/search', searchPDFs);

module.exports = router;
