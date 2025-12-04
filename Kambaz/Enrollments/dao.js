import model from "./model.js";

export default function EnrollmentsDao(db) {
    
    async function findCoursesForUser(userId) {
        const enrollments = await model.find({ user: userId });
        return enrollments.map((enrollment) => enrollment.course);
    }
    
    async function findUsersForCourse(courseId) {
        const enrollments = await model.find({ course: courseId });
        return enrollments.map((enrollment) => enrollment.user);
    }

    function enrollUserInCourse(userId, courseId) {
        // Don't set custom _id, let MongoDB generate it
        return model.create({
            user: userId,
            course: courseId,
        });
    }
    
    function unenrollUserFromCourse(userId, courseId) {
        // Fixed: was using undefined variables
        return model.deleteOne({ user: userId, course: courseId });
    }

    function unenrollAllUsersFromCourse(courseId) {
        return model.deleteMany({ course: courseId });
    }
    
    return {
        findCoursesForUser,
        findUsersForCourse,
        enrollUserInCourse,
        unenrollUserFromCourse,
        unenrollAllUsersFromCourse
    };
}