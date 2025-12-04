import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
    const dao = EnrollmentsDao(db);
    
    const enrollUserInCourse = async (req, res) => {
        try {
            let { userId, courseId } = req.params;
            
            if (userId === "current") {
                const currentUser = req.session["currentUser"];
                if (!currentUser) {
                    res.sendStatus(401);
                    return;
                }
                userId = currentUser._id;
            }
            
            // Check if already enrolled
            const existingEnrollments = await dao.findCoursesForUser(userId);
            if (existingEnrollments.includes(courseId)) {
                res.status(400).json({ message: "Already enrolled in this course" });
                return;
            }
            
            const enrollment = await dao.enrollUserInCourse(userId, courseId);
            res.status(201).json(enrollment);
        } catch (error) {
            console.error("Error enrolling user:", error);
            res.status(500).json({ 
                message: "Error enrolling in course", 
                error: error.message 
            });
        }
    };
    
    const unenrollUserFromCourse = async (req, res) => {
        try {
            let { userId, courseId } = req.params;
            
            if (userId === "current") {
                const currentUser = req.session["currentUser"];
                if (!currentUser) {
                    res.sendStatus(401);
                    return;
                }
                userId = currentUser._id;
            }
            
            await dao.unenrollUserFromCourse(userId, courseId);
            res.sendStatus(204);
        } catch (error) {
            console.error("Error unenrolling user:", error);
            res.status(500).json({ 
                message: "Error unenrolling from course", 
                error: error.message 
            });
        }
    };
    
    app.post("/api/users/:userId/courses/:courseId/enroll", enrollUserInCourse);
    app.delete("/api/users/:userId/courses/:courseId/unenroll", unenrollUserFromCourse);
}