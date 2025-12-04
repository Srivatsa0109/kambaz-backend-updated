import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
    // REMOVE _id field - let MongoDB auto-generate it
    course: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    grade: Number,
    letterGrade: String,
    enrollmentDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ["ENROLLED", "DROPPED", "COMPLETED"],
        default: "ENROLLED",
    },
},
{
    collection: "enrollments",
    timestamps: true,
});

export default enrollmentSchema;