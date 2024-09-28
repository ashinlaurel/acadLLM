const mongoose = require('mongoose');

const LectureSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },             // Lecture title
  description: { type: String, required: true },       // Lecture description
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true } // Reference to Course
}, { timestamps: true });

const Lecture = mongoose.model('Lecture', LectureSchema);
module.exports = Lecture;
