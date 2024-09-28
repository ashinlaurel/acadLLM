const Course = require('../models/Course');
const Lecture = require('../models/Lecture');
const upload = require('../config/multerConfig');

exports.createLecture = async (req, res) => {
  const { id, courseId, title, description } = req.body;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const newLecture = new Lecture({
      id,
      title,
      description,
      courseId
    });

    const savedLecture = await newLecture.save();

    course.lectures.push(savedLecture._id);
    await course.save();

    res.status(201).json({ success: true, data: savedLecture });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to create lecture' });
  }
};

exports.uploadPDF = [
  upload.single('pdf'),
  async (req, res) => {
    try {
      const { lectureId, metadata } = req.body;

      if (!req.file) {
        return res.status(400).json({ success: false, message: 'No PDF file uploaded' });
      }
      const pdfUrl = req.file.path; 

      const newPDF = new LecturePDF({
        lectureId,
        pdfUrl,         
        metadata
      });

      await newPDF.save(); 
      res.status(201).json({ success: true, data: newPDF });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Failed to upload PDF' });
    }
  }
];

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
