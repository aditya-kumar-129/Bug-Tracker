import { useParams } from "react-router-dom";
import BugDetail from "../component/BugDetail/BugDetail"

const Bug = () => {
  const params = useParams();
  return <BugDetail bugID={params.bugID} />;
};

export default Bug;
