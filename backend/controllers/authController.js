// Task 1 – Add Student (CREATE)
// Create a Student Registration form and store the details in MongoDB.
// Fields: Name, Email, Course, City
// POST /api/students
// Requirements: Use useState and axios.post() in React. In the backend, use Student.create(req.body) and validate required fields.

import studentModel from "../models/studentsModel.js";

export const addStudent = async (req, res) => {
  console.log("BODY", req.body);
  
  try {
    const { studentname, email, course, city } = req.body;

    if (!studentname || !email || !course || !city) {
      res.status(400).json({ msg: "Please fill the form" });
      return;
    }

    const checkEmailExits = await studentModel.findOne({ email });

    if (checkEmailExits) {
      res.status(400).json({ msg: "Email already exits" });
    }

    const saveData = await studentModel.create({
      studentname,
      email,
      course,
      city,
    });
    res.status(201).json({ msg: "successfully register" });
  } catch (error) {
    console.log("Error", error);
  }
};






// Task 2 – Show All Students (FIND)
// Display all registered students in a React table.
// GET /api/students
// Requirements: Use useEffect, axios.get(), setStudents(), and map() in React. Use Student.find() in the controller.

export const getStudents = async (req, res) => {
  try {
    const getStudentData = await studentModel.find();

    if (!getStudentData) {
      res.status(400).json({ msg: "Database Issue" });
    }

    res.status(200).json({ msg: "successfully fetched", getStudentData });
  } catch (error) {
    console.log("Error", error);
  }
};






// Task 3 – Search Student by ID (FIND BY ID)
// Create an input box to enter a MongoDB Student ID and a Search button.
// GET /api/students/:id
// Requirements: Use req.params.id and Student.findById(). Display the selected student's name, email, course, and city. Show a message if the student is not found.

export const getStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const getStudent = await studentModel.findById(id);

    res.status(200).json({ msg: "successfully get dat", getStudent });
  } catch (error) {
    console.log("Error", error);
  }
};





// Task 4 – Edit Student (UPDATE BY ID)
// Add an Edit button for every student. Clicking Edit should fill the form with the selected student's existing details.
// PUT /api/students/:id
// Requirements: Use setForm(), setEditId(), and axios.put(). In the controller, use:
// Student.findByIdAndUpdate(id, data, {
//     new: true,
//     runValidators: true
// });
// After updating, refresh the student list.

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentname, email, course, city } = req.body;

    const updatedData = await studentModel.findByIdAndUpdate(id, {
      studentname,
      email,
      course,
      city,
    });

    res.status(200).json({ msg: "successfully Updated" });
  } catch (error) {
    console.log("Error", error);
  }
};

// Task 5 – Delete Student (DELETE BY ID)
// Add a Delete button for every student in the table.

// DELETE /api/students/:id
// Requirements: Pass the selected student's _id using axios.delete(). Use Student.findByIdAndDelete() in the controller and refresh the list after deletion.

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteStudent = await studentModel.findByIdAndDelete(id);
    res.status(200).json({ msg: "successfully deleted" });
  } catch (error) {
    console.log("Error", error);
  }
};
