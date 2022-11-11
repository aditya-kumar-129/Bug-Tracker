import Navbar from "../component/navbar/Navbar";
import { useInfoContext } from "../Context";
import { useNavigate } from "react-router-dom";
import ProjectsBugsDashboard from "../component/ProjectsBugsDashboard/ProjectsBugsDashboard";
import { useEffect } from "react";

const Dashboard = () => {
  const { loginCheck } = useInfoContext();

  const navigate = useNavigate();
  useEffect(() => {
    if (!loginCheck()) navigate("/login");
  }, [loginCheck, navigate]);
  return (
    <>
      <Navbar />
      <ProjectsBugsDashboard />
    </>
  );
};

export default Dashboard;
