import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    title: String,
    course: String,
    description: String,
    points: Number,
    dueDate: String,
    availableFrom: String,
    availableUntil:String,
    assignmentGroup: {
      type: String,
      default: "ASSIGNMENTS",
      enum: ["ASSIGNMENTS", "QUIZZES", "EXAMS", "PROJECTS"],
    },
    displayGradeAs: {
      type: String,
      default: "Percentage",
      enum: ["Percentage", "Points"],
    },
    submissionType: {
      type: String,
      default: "Online",
      enum: ["Online", "Offline"],
    },
    textEntry: Boolean,
    websiteUrl: Boolean,
    mediaRecordings: Boolean,
    studentAnnotation: Boolean,
    fileUploads: Boolean,
  },
  {collection: "assignments",}
);
export default assignmentSchema;