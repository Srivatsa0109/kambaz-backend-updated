import UsersDao from "./dao.js";
import migrateUsers from "./migration.js";
import mongoose from "mongoose";

export default function UserRoutes(app) {
  const dao = UsersDao();

  // Helper to generate sequential numeric IDs
  const generateUserId = async () => {
    const users = await dao.findAllUsers();
    
    // Filter only numeric IDs and find the max
    const numericIds = users
      .map(u => {
        const id = String(u._id);
        const parsed = parseInt(id);
        return isNaN(parsed) ? 0 : parsed;
      })
      .filter(id => id > 0);
    
    // Start from 123 if no users, otherwise increment from max
    const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 122;
    const newId = String(maxId + 1);
    
    console.log("Generated new user ID:", newId);
    return newId;
  };

  const createUser = async (req, res) => {
    try {
      const userData = { 
        _id: await generateUserId(),
        ...req.body 
      };
      console.log("Creating user with data:", userData);
      const user = await dao.createUser(userData);
      console.log("User created successfully:", user);
      res.json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: error.message });
    }
  };

  const deleteUser = async (req, res) => {
    try {
      const userId = req.params.userId;
      console.log("=== DELETE USER ===");
      console.log("Deleting user:", userId);
      
      // 1. Delete all enrollments for this user
      const enrollmentResult = await mongoose.connection
        .collection('enrollments')
        .deleteMany({ user: String(userId) });
      
      console.log("Deleted enrollments:", enrollmentResult.deletedCount);
      
      // 2. Delete the user
      const userResult = await dao.deleteUser(userId);
      console.log("Deleted user:", userResult);
      
      res.json({ 
        message: "User and all related data deleted successfully",
        deletedEnrollments: enrollmentResult.deletedCount,
        deletedUser: userResult 
      });
      
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ 
        message: "Failed to delete user",
        error: error.message 
      });
    }
  };


  const findAllUsers = async (req, res) => {
    const { role, name } = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return;
    }
    if (name) {
      const users = await dao.findUsersByPartialName(name);
      res.json(users);
      return;
    }
    const users = await dao.findAllUsers();
    res.json(users);
  };

  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  };

  const updateUser = async (req, res) => {
    const userId = req.params.userId;
    const userUpdates = req.body;
    await dao.updateUser(userId, userUpdates);
    const currentUser = req.session["currentUser"];
    if (currentUser && currentUser._id === userId) {
      req.session["currentUser"] = { ...currentUser, ...userUpdates };
    }
    res.json(currentUser);
  };

  const signup = async (req, res) => {
    try {
      console.log("Signup request body:", req.body);
      
      const existingUser = await dao.findUserByUsername(req.body.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already in use" });
      }
      
      const newUserId = await generateUserId();
      const userData = {
        _id: newUserId,
        ...req.body
      };
      
      console.log("Creating new user with ID:", newUserId);
      const currentUser = await dao.createUser(userData);
      console.log("User created:", currentUser);
      
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ message: error.message });
    }
  };

  const signin = async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log("=== SIGNIN DEBUG ===");
      console.log("Username:", username);

      const user = await dao.findUserByUsername(username);
      console.log("User found:", user);
      console.log("User _id:", user?._id);

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const userId = String(user._id);
      
      const userResponse = {
        _id: userId,
        username: user.username,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        dob: user.dob,
        role: user.role,
        loginId: user.loginId,
        section: user.section,
        lastActivity: user.lastActivity,
        totalActivity: user.totalActivity,
      };

      console.log("Sending user response with _id:", userResponse._id);
      console.log("===================");

      req.session["currentUser"] = userResponse;
      res.json(userResponse);
    } catch (err) {
      console.error("Signin error:", err);
      res.status(500).json({ message: err.message });
    }
  };

  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };

  const findMyCourses = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }

    try {
      let courses = [];
      if (currentUser.role === "STUDENT") {
        courses = await dao.findCoursesForStudent(currentUser._id);
      } else if (currentUser.role === "FACULTY" || currentUser.role === "ADMIN") {
        courses = await dao.findCoursesForFaculty(currentUser._id);
      }
      res.json(courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      res.status(500).json({ message: error.message });
    }
  };

  const migrate = async (req, res) => {
    try {
      await migrateUsers();
      const users = await dao.findAllUsers();
      res.json({ 
        message: "✓ Migration successful!", 
        count: users.length, 
        users 
      });
    } catch (error) {
      console.error("Migration error:", error);
      res.status(500).json({ message: error.message });
    }
  };

  app.get("/api/users/debug/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
      console.log("Debug: Looking for user ID:", userId);
      
      const byId = await dao.findUserById(userId);
      const allUsers = await dao.findAllUsers();
      const userIds = allUsers.map(u => ({ _id: u._id, username: u.username }));
      
      res.json({
        searchedId: userId,
        searchedIdType: typeof userId,
        foundById: byId,
        allUserIds: userIds,
        totalUsers: allUsers.length
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/users/migrate", migrate);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.get("/api/users/profile", profile);
  app.get("/api/users/current/courses", findMyCourses);
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
}