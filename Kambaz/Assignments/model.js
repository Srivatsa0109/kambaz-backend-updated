import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  course: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  points: { type: Number, default: 100 },
  assignmentGroup: String,
  displayGradeAs: String,
  submissionType: String,
  dueDate: String,
  availableFrom: String,
  availableUntil: String,
  textEntry: Boolean,
  websiteUrl: Boolean,
  mediaRecordings: Boolean,
  studentAnnotation: Boolean,
  fileUploads: Boolean
}, { 
  collection: "assignments",
  _id: false
});

export default mongoose.model("Assignment", assignmentSchema);