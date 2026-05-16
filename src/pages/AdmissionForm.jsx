import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./AdmissionForm.css";

function AdmissionForm() {
  const { id } = useParams(); // id aaya to EDIT mode
  const navigate = useNavigate();

  console.log("EDIT ID :", id);

  const initialState = {
    name: "",
    fatherName: "",
    mobile: "",
    email: "",
    course: "",
    duration: "",
    totalFees: "",
    paidFees: "",
    paymentMode: "",
    address: ""
  };

  const [form, setForm] = useState(initialState);
  const isEdit = Boolean(id);

  //  Edit mode me student data load
  useEffect(()=>{
    if(isEdit){
      fetchStudent();
    }
  },[id]);

  const fetchStudent = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5002/api/students/${id}`
      );
      setForm({
        name: res.data.name || "",
        fatherName: res.data.fatherName || "",
        mobile: res.data.mobile || "",
        email: res.data.email || "",
        course: res.data.course || "",
        duration: res.data.duration || "",
        totalFees: res.data.totalFees || "",
        paidFees: res.data.paidFees || "",
        paymentMode: res.data.paymentMode || "",
        address: res.data.address || ""
      });
    } catch (err) {
      alert("Student not found");
      navigate("/students");
    }
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (isEdit) {
        // UPDATE
        await axios.put(
          `http://localhost:5002/api/students/${id}`,
          form
        );
        alert("Admission Updated Successfully");
      } else {
        // NEW ADMISSION
        await axios.post(
          "http://localhost:5002/api/students/admission",
          form
        );
        alert("Admission Successful");
      }

      setForm(initialState);
      navigate("/students"); // redirect to list
    } catch (err) {
      alert(err.response?.data?.message || "Operation Failed");
    }
  };

  return (
    <div className="admission-container">
      <h2 className="form-title">
        {isEdit ? "Update Student Admission" : "New Student Admission"}
      </h2>

      <form className="admission-form two-column" onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Student Name *</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Father Name</label>
          <input
            name="fatherName"
            value={form.fatherName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Mobile Number</label>
          <input
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Course</label>
          <select
            name="course"
            value={form.course}
            onChange={handleChange}
          >
            <option value="">Select Course</option>
            <option>Basic Computer</option>
            <option>Full Stack Development</option>
            <option>Python</option>
            <option>MS Office</option>
          </select>
        </div>

        <div className="form-group">
          <label>Course Duration</label>
          <input
            name="duration"
            value={form.duration}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Total Fees</label>
          <input
            name="totalFees"
            value={form.totalFees}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Paid Fees</label>
          <input
            name="paidFees"
            value={form.paidFees}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Payment Mode</label>
          <select
            name="paymentMode"
            value={form.paymentMode}
            onChange={handleChange}
          >
            <option value="">Select Mode</option>
            <option>Cash</option>
            <option>UPI</option>
            <option>Card</option>
          </select>
        </div>

        <div className="form-group full-width">
          <label>Address</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions full-width">
          <button type="submit" className="submit-btn">
            {isEdit ? "Update Admission" : "Submit Admission"}
          </button>
        </div>

      </form>
    </div>
  );
}

export default AdmissionForm;