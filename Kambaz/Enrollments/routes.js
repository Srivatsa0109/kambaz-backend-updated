import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
    const dao = EnrollmentsDao(db);
    
    const enrollUserInCourse = async (req, res) => {
        try {
            let { userId, courseId } = req.params;
            
            console.log("=== ENROLL REQUEST ===");
            console.log("userId:", userId, "type:", typeof userId);
            console.log("courseId:", courseId, "type:", typeof courseId);
            
            if (userId === "current") {
                const currentUser = req.session["currentUser"];
                if (!currentUser) {
                    return res.sendStatus(401);
                }
                userId = currentUser._id;
            }
            
            userId = String(userId);
            courseId = String(courseId);
            
            const existingEnrollments = await dao.findCoursesForUser(userId);
            console.log("Existing enrollments:", existingEnrollments);
            
            const alreadyEnrolled = existingEnrollments.some(enrollment => {
                const enrolledCourseId = String(enrollment.course || enrollment);
                console.log("Comparing:", enrolledCourseId, "===", courseId);
                return enrolledCourseId === courseId;
            });
            
            console.log("Already enrolled?", alreadyEnrolled);
            
            if (alreadyEnrolled) {
                return res.status(400).json({ 
                    message: "Already enrolled in this course" 
                });
            }
            
            const enrollment = await dao.enrollUserInCourse(userId, courseId);
            console.log("Enrollment created:", enrollment);
            
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
            
            console.log("=== UNENROLL REQUEST ===");
            console.log("userId:", userId);
            console.log("courseId:", courseId);
            
            if (userId === "current") {
                const currentUser = req.session["currentUser"];
                if (!currentUser) {
                    return res.sendStatus(401);
                }
                userId = currentUser._id;
            }
            
            userId = String(userId);
            courseId = String(courseId);
            
            await dao.unenrollUserFromCourse(userId, courseId);
            console.log("Unenrolled successfully");
            
            res.sendStatus(204);
        } catch (error) {
            console.error("Error unenrolling user:", error);
            res.status(500).json({ 
                message: "Error unenrolling from course", 
                error: error.message 
            });
        }
    };
    
    const getUserEnrollments = async (req, res) => {
        try {
            let { userId } = req.params;
            
            if (userId === "current") {
                const currentUser = req.session["currentUser"];
                if (!currentUser) {
                    return res.sendStatus(401);
                }
                userId = currentUser._id;
            }
            
            userId = String(userId);
            const enrollments = await dao.findEnrollmentsForUser(userId);
            res.json(enrollments);
        } catch (error) {
            console.error("Error fetching enrollments:", error);
            res.status(500).json({ 
                message: "Error fetching enrollments", 
                error: error.message 
            });
        }
    };
    
    app.post("/api/users/:userId/courses/:courseId/enroll", enrollUserInCourse);
    app.delete("/api/users/:userId/courses/:courseId/unenroll", unenrollUserFromCourse);
    app.get("/api/users/:userId/enrollments", getUserEnrollments);
}