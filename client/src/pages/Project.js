import { useParams } from "react-router-dom";
import ProjectDetail from "../component/ProjectDetail/ProjectDetail";

const Project = () => {
  const params = useParams();
  return <ProjectDetail projectID={params.projectID} />;
};

export default Project;
