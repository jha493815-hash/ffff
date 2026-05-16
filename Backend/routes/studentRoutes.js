const express = require("express");
const Student = require("../models/Student");
const router = express.Router();

/* =========================
   ADD STUDENT
========================= */
router.post("/admission", async (req, res) => {
  try {
    console.log("REQ BODY :", req.body);

    const student = new Student(req.body);
    await student.save();

    res.status(201).json({ message: "Admission Successful" });
  } catch (err) {
    console.error("SAVE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

/* =========================
   GET ALL STUDENTS
========================= */
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
});

/* =========================
   GET SINGLE STUDENT  (MISSING)
========================= */
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
});

/* =========================
   UPDATE STUDENT
========================= */
router.put("/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Student Updated Successfully",
      student: updatedStudent
    });
  } catch (err) {
    res.status(500).json({ message: "Update Failed" });
  }
});

/* =========================
   DELETE STUDENT (OPTIONAL)
========================= */
router.delete("/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete Failed" });
  }
});

module.exports = router;