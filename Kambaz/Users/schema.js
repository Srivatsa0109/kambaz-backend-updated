import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: { type: String }, // ← Add this to accept string IDs
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    email: String,
    dob: Date,
    role: {
      type: String,
      enum: ["STUDENT", "FACULTY", "ADMIN", "TA"],
      default: "STUDENT",
    },
    loginId: String,
    section: String,
    lastActivity: String,
    totalActivity: String,
  },
  { 
    collection: "users",
    _id: false // ← Add this to disable auto ObjectId generation
  }
);

export default userSchema;