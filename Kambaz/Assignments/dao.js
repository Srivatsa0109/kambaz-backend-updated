import AssignmentModel from "./model.js";

export async function findAssignmentsForCourse(courseId) {
  return AssignmentModel.find({ course: courseId }).lean();
}

export async function createAssignment(assignment) {
  if (!assignment._id) {
    const count = await AssignmentModel.countDocuments({ course: assignment.course });
    assignment._id = `A${(count + 101).toString()}`;
  }
  const created = await AssignmentModel.create(assignment);
  return created.toObject();
}

export async function deleteAssignment(assignmentId) {
  return AssignmentModel.deleteOne({ _id: assignmentId });
}

export async function updateAssignment(assignmentId, updates) {
  return AssignmentModel.updateOne({ _id: assignmentId }, { $set: updates });
}

export async function findAssignmentById(assignmentId) {
  return AssignmentModel.findOne({ _id: assignmentId }).lean();
}