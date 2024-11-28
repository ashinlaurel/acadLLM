const mongoose = require("mongoose");

const LecturePDFSchema = new mongoose.Schema(
  {
    lectureId: { type: mongoose.Schema.Types.ObjectId, ref: "Lecture" }, // Reference to Lecture
    pdfUrl: { type: String, required: true }, // URL to the PDF
    vectorIndex: { type: Number }, // Index for FAISS vector
    metadata: { type: String }, // Any additional metadata
  },
  { timestamps: true }
);

const LecturePDF = mongoose.model("LecturePDF", LecturePDFSchema);

module.exports = LecturePDF;
