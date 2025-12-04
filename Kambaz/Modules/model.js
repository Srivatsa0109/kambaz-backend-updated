import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
  _id: { type: String, required: true },  // ← Add this line to use String instead of ObjectId
  name: { type: String, required: true },
  description: String,
  course: { type: String, required: true },
  lessons: [{
    _id: { type: String, required: true },  // ← Also fix lessons if needed
    name: String,
    description: String,
    module: String
  }]
}, { 
  collection: "modules",
  _id: false  // ← Add this to prevent Mongoose from auto-generating ObjectId
});

export default mongoose.model("Module", moduleSchema);