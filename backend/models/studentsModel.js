import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    studentname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const studentModel = mongoose.model("students", studentSchema);

export default studentModel;
