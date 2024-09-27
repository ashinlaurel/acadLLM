const LecturePDF = require('../models/LecturePDF');

// Upload a new PDF and save its metadata
exports.uploadPDF = async (req, res) => {
  try {
    const { lectureId, pdfUrl, vectorIndex, metadata } = req.body;

    const newPDF = new LecturePDF({
      lectureId,
      pdfUrl,
      vectorIndex,
      metadata
    });

    await newPDF.save();
    res.status(201).json({ success: true, data: newPDF });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to upload PDF' });
  }
};

// Search for PDFs based on vector index
exports.searchPDFs = async (req, res) => {
  try {
    const { vectorIndices } = req.body;

    const results = await LecturePDF.find({ vectorIndex: { $in: vectorIndices } });

    res.status(200).json({ success: true, data: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Search failed' });
  }
};
