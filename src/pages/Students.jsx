import { useEffect, useState } from "react";
import axios from "axios";
import "./Students.css";

import { useNavigate } from "react-router-dom";



function Students() {
    const [students, setStudents] = useState([]);
    const [editStudent, setEditStudent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        const res = await axios.get("http://localhost:5002/api/students");
        setStudents(res.data);
    };

    const deleteStudent = async (id) => {
        if (!window.confirm("Delete this student?")) return;
        await axios.delete(`http://localhost:5002/api/students/${id}`);
        fetchStudents();
    };

    const updateStudent = async () => {
        try {
            await axios.put(
                `http://localhost:5002/api/students/${editStudent._id}`,
                editStudent
            );
            setEditStudent(null);
            fetchStudents();
        } catch {
            alert("Update failed");
        }
    };

    return (
        <div className="students-page">
            <h2 className="page-title">Student List</h2>

            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Course</th>
                            <th>Mobile</th>
                            <th>Total Fees</th>
                            <th>Paid</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {students.map((s, i) => (
                            <tr key={s._id}>
                                <td>{i + 1}</td>
                                <td>{s.name}</td>
                                <td>{s.course}</td>
                                <td>{s.mobile}</td>
                                <td>₹ {s.totalFees}</td>
                                <td>₹ {s.paidFees}</td>
                                <td className="action-col">
                                    <button
                                        className="edit-btn"
                                        onClick={() => navigate(`/admission/${s._id}`)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => deleteStudent(s._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* EDIT MODAL */}
            {editStudent && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Edit Student</h3>

                        <input
                            value={editStudent.name}
                            onChange={e =>
                                setEditStudent({ ...editStudent, name: e.target.value })
                            }
                            placeholder="Student Name"
                        />

                        <input
                            value={editStudent.course}
                            onChange={e =>
                                setEditStudent({ ...editStudent, course: e.target.value })
                            }
                            placeholder="Course"
                        />

                        <input
                            value={editStudent.mobile}
                            onChange={e =>
                                setEditStudent({ ...editStudent, mobile: e.target.value })
                            }
                            placeholder="Mobile"
                        />

                        <input
                            value={editStudent.totalFees}
                            onChange={e =>
                                setEditStudent({ ...editStudent, totalFees: e.target.value })
                            }
                            placeholder="Total Fees"
                        />

                        <input
                            value={editStudent.paidFees}
                            onChange={e =>
                                setEditStudent({ ...editStudent, paidFees: e.target.value })
                            }
                            placeholder="Paid Fees"
                        />

                        <div className="modal-actions">
                            <button onClick={updateStudent} className="save-btn">
                                Update
                            </button>
                            <button
                                onClick={() => setEditStudent(null)}
                                className="cancel-btn"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Students;