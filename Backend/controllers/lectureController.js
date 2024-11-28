const Course = require("../models/Course");
const Lecture = require("../models/Lecture");
const LecturePDF = require("../models/LecturePDF");
const multer = require("multer");
const path = require("path");

// Configure multer for PDF uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

// Update the upload middleware to accept multiple files
const upload = multer({ storage: storage }).array("files", 10); // Allow up to 10 files

exports.createLecture = async (req, res) => {
  const { id, courseId, title, description } = req.body;
  console.log(req.body);
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    const newLecture = new Lecture({
      id,
      title,
      description,
      courseId,
    });

    const savedLecture = await newLecture.save();

    course.lectures.push(savedLecture._id);
    await course.save();

    res.status(201).json({ success: true, data: savedLecture });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to create lecture" });
  }
};

exports.uploadPDF = (req, res) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      console.error('Multer error:', err);
      return res.status(400).json({ success: false, message: err.message });
    } else if (err) {
      console.error('Unknown error during upload:', err);
      return res.status(500).json({ success: false, message: "An unknown error occurred during upload" });
    }

    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ success: false, message: "No files uploaded" });
      }

      const { lectureId } = req.body;
      if (!lectureId) {
        return res.status(400).json({ success: false, message: "lectureId is required" });
      }

      const uploadedPDFs = [];

      for (const file of req.files) {
        const pdfUrl = `/uploads/${file.filename}`;
        const newPDF = new LecturePDF({
          lectureId,
          pdfUrl,
          // Add vectorIndex and metadata if needed
        });

        const savedPDF = await newPDF.save();
        uploadedPDFs.push(savedPDF);
      }

      res.status(201).json({ success: true, data: uploadedPDFs });
    } catch (err) {
      console.error('Error saving PDFs:', err);
      res.status(500).json({ success: false, message: "Failed to upload PDFs", error: err.message });
    }
  });
};

exports.getLecturesForCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    // console.log(courseId);
    const results = await Course.findById(courseId)
      .populate("lectures", "id title description")
      .exec();
    res.status(201).json({ success: true, data: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch lectures" });
  }
};

exports.searchPDFs = async (req, res) => {
  try {
    const { vectorIndices } = req.body;

    const results = await LecturePDF.find({ vectorIndex: { $in: vectorIndices } });

    res.status(200).json({ success: true, data: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Search failed" });
  }
};

exports.getPDFsForLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const results = await LecturePDF.find({ lectureId });
    res.status(200).json({ success: true, data: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch PDFs" });
  }
};
