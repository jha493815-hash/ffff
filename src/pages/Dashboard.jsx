import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalFees: 0,
    totalPaid: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:5002/api/students");
      const students = res.data;

      const totalStudents = students.length;

      let totalFees = 0;
      let totalPaid = 0;

      students.forEach(s => {
        totalFees += Number(s.totalFees || 0);
        totalPaid += Number(s.paidFees || 0);
      });

      setStats({
        totalStudents,
        totalFees,
        totalPaid
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Admin Dashboard</h2>

      <div className="dashboard-grid">
        <div className="card blue">
          <h3>Total Students</h3>
          <p>{stats.totalStudents}</p>
        </div>

        <div className="card green">
          <h3>Total Fees</h3>
          <p>₹ {stats.totalFees}</p>
        </div>

        <div className="card purple">
          <h3>Fees Collected</h3>
          <p>₹ {stats.totalPaid}</p>
        </div>

        <div className="card red">
          <h3>Fees Pending</h3>
          <p>₹ {stats.totalFees - stats.totalPaid}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;