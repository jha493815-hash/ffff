import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AdmissionForm from "./pages/AdmissionForm";
import Students from "./pages/Students";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <Sidebar />

      <div style={{ marginLeft: "230px", padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/admission" element={<AdmissionForm />} />
          <Route path="/admission/:id" element={<AdmissionForm />} />
          <Route path="/students" element={<Students />} />
        </Routes>
      </div>
    </>
  );
}

export default App;