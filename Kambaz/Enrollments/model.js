import mongoose from "mongoose";
import schema from "./schema.js"; // Import from schema.js, not Modules/schema.js!

const model = mongoose.model("EnrollmentModel", schema);
export default model;