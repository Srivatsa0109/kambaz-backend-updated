import * as modulesDao from "./dao.js";

export default function ModuleRoutes(app) {
  
  // Get all modules for a course
  app.get("/api/courses/:courseId/modules", async (req, res) => {
    try {
      const { courseId } = req.params;
      const modules = await modulesDao.findModulesForCourse(courseId);
      res.json(modules);
    } catch (error) {
      console.error("Error fetching modules:", error);
      res.status(500).json({ 
        message: "Error fetching modules", 
        error: error.message 
      });
    }
  });

  // Create a new module
  app.post("/api/courses/:courseId/modules", async (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      
      if (!currentUser || (currentUser.role !== "FACULTY" && currentUser.role !== "ADMIN")) {
        return res.status(403).json({ 
          message: "Only faculty can create modules" 
        });
      }

      const { courseId } = req.params;
      const module = {
        ...req.body,
        course: courseId,
      };
      
      console.log("Creating module with data:", module); // Debug log
      
      const newModule = await modulesDao.createModule(module);
      console.log("Created module:", newModule); // Debug log
      
      res.status(201).json(newModule);
    } catch (error) {
      console.error("Error creating module:", error);
      res.status(500).json({ 
        message: "Error creating module", 
        error: error.message 
      });
    }
  });

  // Update a module
  app.put("/api/courses/:courseId/modules/:moduleId", async (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      
      if (!currentUser || (currentUser.role !== "FACULTY" && currentUser.role !== "ADMIN")) {
        return res.status(403).json({ 
          message: "Only faculty can update modules" 
        });
      }

      const { moduleId } = req.params;
      const moduleUpdates = req.body;
      
      console.log("Updating module:", moduleId, "with:", moduleUpdates); // Debug log
      
      const status = await modulesDao.updateModule(moduleId, moduleUpdates);
      
      if (status.matchedCount === 0) {
        return res.status(404).json({ message: "Module not found" });
      }
      
      // Fetch and return the updated module
      const updatedModule = await modulesDao.findModuleById(moduleId);
      console.log("Updated module:", updatedModule); // Debug log
      
      res.json(updatedModule);
    } catch (error) {
      console.error("Error updating module:", error);
      res.status(500).json({ 
        message: "Error updating module", 
        error: error.message 
      });
    }
  });

  // Delete a module
  app.delete("/api/courses/:courseId/modules/:moduleId", async (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      
      if (!currentUser || (currentUser.role !== "FACULTY" && currentUser.role !== "ADMIN")) {
        return res.status(403).json({ 
          message: "Only faculty can delete modules" 
        });
      }

      const { moduleId } = req.params;
      
      console.log("Deleting module:", moduleId); // Debug log
      
      const status = await modulesDao.deleteModule(moduleId);
      
      if (status.deletedCount === 0) {
        return res.status(404).json({ message: "Module not found" });
      }
      
      console.log("Module deleted successfully"); // Debug log
      
      res.sendStatus(204);
    } catch (error) {
      console.error("Error deleting module:", error);
      res.status(500).json({ 
        message: "Error deleting module", 
        error: error.message 
      });
    }
  });
}