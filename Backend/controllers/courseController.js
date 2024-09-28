const Course = require('../models/Course');



exports.createCourse = async (req, res) => {
  const {  courseId, courseName, description } = req.body;
  console.log(req.body);

  try {
    const newCourse = new Course({
      courseId,
      courseName,
      description,
    });

    const savedCourse = await newCourse.save();

    res.status(201).json({ success: true, data: savedCourse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to create lecture' });
  }
};

// Get all courses
exports.getAll = async (req, res) => {
  try {
    const courses = await Course.find();  // Fetch all courses from the database
    res.status(200).json({ success: true, data: courses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to fetch courses' });
  }
};


exports.getCourseById = async (req, res) => {
  const { id } = req.body;

  try {
    const course = await Course.findOne({ _id:id });

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    res.status(200).json({ success: true, data: course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to fetch course' });
  }
};

