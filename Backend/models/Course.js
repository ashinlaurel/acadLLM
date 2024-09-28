const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  courseId: {type: String,required:true, unique: true},
  courseName: { type: String, required: true, unique: true },
  description: {type:String},
  lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lecture' }]
}, { timestamps: true });

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;
