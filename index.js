import "dotenv/config";
import express from "express";
import cors from "cors";
import session from "express-session";
import mongoose from "mongoose";

import hello from "./hello.js";
import lab5 from './Labs/lab5/index.js';
import CoursesRoutes from "./Kambaz/Courses/routes.js";
import ModulesRoutes from "./Kambaz/Modules/routes.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import AssignmentsRoutes from "./Kambaz/Assignments/routes.js";
import EnrollmentsRoutes from "./Kambaz/Enrollments/routes.js";

const CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING;

mongoose.connect(CONNECTION_STRING)
    .then(() => console.log("✅ Connected to MongoDB Atlas!"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

const app = express();

app.use(cors({
    credentials: true,
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);        
        if (origin.includes('localhost')) return callback(null, true);        
        if (origin === process.env.CLIENT_URL) return callback(null, true);
        if (origin.includes('vercel.app')) return callback(null, true);        
        console.log('Blocked origin:', origin);
        callback(new Error('Not allowed by CORS'));
    },
}));
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kambaz",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, 
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", 
    }
};

if (process.env.NODE_ENV === "production") {
    sessionOptions.proxy = true;
}

app.use(session(sessionOptions));
app.use(express.json());


UserRoutes(app);
hello(app);
lab5(app);
CoursesRoutes(app);
ModulesRoutes(app);
AssignmentsRoutes(app);
EnrollmentsRoutes(app);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
    console.log(`Accepting requests from: ${process.env.CLIENT_URL || 'http://localhost:3000'}`);
});

export default app;
