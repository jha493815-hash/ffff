const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fatherName: String,
  mobile: String,
  email: String,
  course: String,
  duration: String,
  totalFees: Number,
  paidFees: Number,
  paymentMode: String,
  address: String,
  admissionDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Student", studentSchema);