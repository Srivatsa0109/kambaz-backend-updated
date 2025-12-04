import UserModel from "./model.js"; 
import CourseModel from "../Courses/model.js"; 

export default function UsersDao() {
  const createUser = (user) => {
    console.log("DAO: Creating user:", user);
    return UserModel.create(user);
  };

  const findAllUsers = () => UserModel.find();

  const findUserById = (userId) => {
    console.log("DAO: Finding user by ID:", userId);
    return UserModel.findOne({ _id: userId });
  };

  const findUserByUsername = (username) => UserModel.findOne({ username });

  const findUsersByRole = (role) => UserModel.find({ role });

  const findUserByCredentials = (username, password) =>
    UserModel.findOne({ username, password });

  const findUsersByPartialName = (partialName) => {
    const regex = new RegExp(partialName, "i");
    return UserModel.find({
      $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
    });
  };

  const updateUser = (userId, user) =>
    UserModel.updateOne({ _id: userId }, { $set: user });

  const deleteUser = (userId) => UserModel.findOneAndDelete({ _id: userId });

  const findCoursesForStudent = async (studentId) => {
    const enrollments = await EnrollmentModel.find({ student: studentId }).populate("course");
    return enrollments.map(e => e.course);
  };

  const findCoursesForFaculty = (facultyId) => {
    return CourseModel.find({ faculty: facultyId });
  };

  return {
    createUser,
    findAllUsers,
    findUserByCredentials,
    findUsersByPartialName,
    findUsersByRole,
    findUserById,
    findUserByUsername,
    updateUser,
    deleteUser,
    findCoursesForStudent,
    findCoursesForFaculty, 
  };
}       