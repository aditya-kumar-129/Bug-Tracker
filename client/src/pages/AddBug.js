import { AddBugForm } from "../component/AddBugForm/AddBugForm"
import { useParams } from "react-router-dom";

const AddBug = () => {
  const params = useParams();
  return <AddBugForm projectID={params.projectID} />;
};

export default AddBug;
