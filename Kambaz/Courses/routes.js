import CoursesDao from "./dao.js";
import EnrollmentsDao from "../Enrollments/dao.js";

export default function CoursesRoutes(app) {
    const dao = CoursesDao();
    const enrollmentsDao = EnrollmentsDao();
    
    const createCourse = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(401);
            return;
        }
        const newCourse = await dao.createCourse(req.body);
        enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
        res.json(newCourse);
    };
    
    const findAllCourses = async (req, res) => {
        const courses = await dao.findAllCourses();
        res.json(courses);
    };

    const findUsersForCourse = async (req,res) => {
        const {cid} = req.params;
        const users = await enrollmentsDao.findUsersForCourse(cid);
        res.json(users);
    }

    const findCoursesForEnrolledUser = async (req, res) => {
        let { userId } = req.params;
        if (userId === "current") {
            const currentUser = req.session["currentUser"];
            if (!currentUser) {
                res.sendStatus(401);
                return;
            }
            userId = currentUser._id;
        }
        const courses = await enrollmentsDao.findCoursesForEnrolledUser(userId);
        res.json(courses);
    };
    
    const deleteCourse = async (req, res) => {
        const { courseId } = req.params;
        await enrollmentsDao.unenrollAllUsersFromCourse(courseId);
        const status = await dao.deleteCourse(courseId);
        res.send(status);  
    };
    
    const updateCourse = async (req, res) => {
        const { courseId } = req.params;
        const courseUpdates = req.body;
        const updatedCourse = await dao.updateCourse(courseId, courseUpdates);
        res.json(updatedCourse); 
    };
    
    const enrollUserInCourse = async(req, res) => {
        let {uid, cid} = req.params;
        if (uid === "current"){
            const currentUser = req.session["currentUser"];
            uid = currentUser._id;
        }
        const status = await enrollmentsDao.enrollUserInCourse(uid, cid);
        res.send(status);
    }

    const unenrollUserFromCourse = async (req, res) => {
    let { uid, cid } = req.params;
    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      uid = currentUser._id;
    }
    const status = await enrollmentsDao.unenrollUserFromCourse(uid, cid);
    res.send(status);
  };

    app.post("/api/users/:uid/courses/:cid", enrollUserInCourse);
    app.delete("/api/users/:uid/courses/:cid", unenrollUserFromCourse);
    app.put("/api/courses/:courseId", updateCourse);
    app.delete("/api/courses/:courseId", deleteCourse);
    app.get("/api/courses", findAllCourses);
    app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
    app.post("/api/users/current/courses", createCourse);
    app.get("/api/courses/:cid/users", findUsersForCourse);
}