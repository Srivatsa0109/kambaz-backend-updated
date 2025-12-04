import * as AssignmentsDao from "./dao.js";
export default function AssignmentsRoutes(app) {

    const findAssignmentsForCourse = async (req, res) => {
        const { courseId } = req.params;
        const assignments = await AssignmentsDao.findAssignmentsForCourse(courseId);
        res.json(assignments);
    };

    const createAssignment = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser || (currentUser.role !== "FACULTY" && currentUser.role !== "ADMIN")) {
            res.status(403).json({ message: "Only faculty can create assignments" });
            return;
        }
        const { courseId } = req.params;
        const assignment = {
            ...req.body,
            course: courseId,
        };
        const newAssignment = await AssignmentsDao.createAssignment(assignment);
        res.json(newAssignment);
    };

   const deleteAssignment = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser || (currentUser.role !== "FACULTY" && currentUser.role !== "ADMIN")) {
            res.status(403).json({ message: "Only faculty can delete assignments" });
            return;
        }
        const { assignmentId } = req.params;
        const status = await AssignmentsDao.deleteAssignment(assignmentId);
        res.send(status);
    };

    
    const findAssignmentById = async (req, res) => {
        const { assignmentId } = req.params;
        const assignment = await AssignmentsDao.findAssignmentById(assignmentId);

        if (!assignment) {
        return res.status(404).json({ message: "Assignment not found" });
        }

        res.json(assignment);
    };

   const updateAssignment = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser || (currentUser.role !== "FACULTY" && currentUser.role !== "ADMIN")) {
            res.status(403).json({ message: "Only faculty can update assignments" });
            return;
        }
        const { assignmentId } = req.params;
        const updates = req.body;
        const status = await AssignmentsDao.updateAssignment(assignmentId,updates);
        
        if (status.matchedCount === 0) {
        return res.status(404).json({ message: "Assignment not found" });
        }
        
        const updatedAssignment = await AssignmentsDao.findAssignmentById(assignmentId);
        res.json(updatedAssignment);
    }; 
    
    app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
    app.post("/api/courses/:courseId/assignments", createAssignment);
    app.delete("/api/courses/assignments/:assignmentId", deleteAssignment);
    app.put("/api/courses/assignments/:assignmentId", updateAssignment);
    app.get("/api/courses/assignments/:assignmentId", findAssignmentById);

}