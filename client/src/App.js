import "./App.css";
import DashBoard from "./pages/DashBoard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import Project from "./pages/Project";
import AddProject from "./pages/AddProject";
import AddBug from "./pages/AddBug";
import Bug from "./pages/Bug";
import {Route,Routes} from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Welcome />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/dashboard" element={<DashBoard />} />
      <Route exact path="/project/:projectID" element={<Project />} />
      <Route exact path="/addproject" element={<AddProject />} />
      <Route exact path="project/:projectID/addbug" element={<AddBug />} />
      <Route exact path="/bug/:bugID" element={<Bug />} />
    </Routes>
  );
}

export default App;
