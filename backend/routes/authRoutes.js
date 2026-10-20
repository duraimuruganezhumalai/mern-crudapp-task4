import express from "express";
import { addStudent, deleteStudent, getStudent, getStudents, updateStudent } from "../controllers/authController.js";

const route = express.Router();

route.post("/students", addStudent)
route.get("/students", getStudents)
route.get("/students/:id", getStudent)
route.put("/students/:id", updateStudent)
route.delete("/students/:id", deleteStudent)


export default route;



// http://localhost:5000/api/students
// http://localhost:5000/api/students
// http://localhost:5000/api/students
// http://localhost:5000/api/students