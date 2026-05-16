import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">Ambience</h2>

      <ul className="menu">
        <li>
          <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/admission" className={({ isActive }) => isActive ? "active" : ""}>
            New Admission
          </NavLink>
        </li>

        <li>
          <NavLink to="/students" className={({ isActive }) => isActive ? "active" : ""}>
            Students
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;