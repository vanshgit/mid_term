const express = require("express");
const router = express.Router();
const Student = require("../model/student");

router.get("/", async (request, response) => {
  try {
    const students = await Student.find();
    response.json(students);
  } catch (error) {
    response.status(500).json({ error: "Error fetching students" });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const student = await Student.findById(request.params.id);
    if (student) {
      response.json(student);
    } else {
      response.status(404).json({ error: "Student not found" });
    }
  } catch (error) {
    response.status(500).json({ error: "Error fetching student" });
  }
});

router.post("/", async (request, response) => {
  try {
    const student = new Student(request.body);
    const savedStudent = await student.save();
    response.status(201).json(savedStudent);
  } catch (error) {
    response.status(500).json({ error: "Error creating student" });
  }
});

router.put("/:id", async (request, response) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true }
    );
    if (updatedStudent) {
      response.json(updatedStudent);
    } else {
      response.status(404).json({ error: "Student not found" });
    }
  } catch (error) {
    response.status(500).json({ error: "Error updating student" });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(request.params.id);
    if (deletedStudent) {
      response.json({ message: "Student deleted" });
    } else {
      response.status(404).json({ error: "Student not found" });
    }
  } catch (error) {
    response.status(500).json({ error: "Error deleting student" });
  }
});

module.exports = router;
