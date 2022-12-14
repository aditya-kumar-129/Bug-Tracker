import { useState } from "react";
import { addProject } from "../../ServerConnections";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import styles from "./AddProjectForm.module.css";

export const AddProjectForm = () => {
  const navigate = useNavigate();
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const handleAddProjectSubmit = (e) => {
    e.preventDefault();
    addProject(projectTitle, projectDescription).then(navigate("/dashboard"));
  };
  return (
    <>
      <Navbar />
      <form className={styles.addForm}>
        <input
          placeholder="Project Title"
          value={projectTitle}
          onChange={(input) => {
            setProjectTitle(input.target.value);
          }}
        />
        <input
          placeholder="Project Description"
          value={projectDescription}
          onChange={(input) => {
            setProjectDescription(input.target.value);
          }}
        />
        <button className={styles.green_btn} onClick={handleAddProjectSubmit}>
          Save
        </button>
      </form>
    </>
  );
};
