import { useNavigate } from "react-router-dom";
import styles from "./BugBar.module.css";

export const BugBar = ({
  projectID,
  bugID,
  bugTitle,
  bugSeverity,
  bugDueDate,
  createdBy,
}) => {
  const navigate = useNavigate();
  const handleBugClick = () => {
    navigate(`/project/${projectID}/${bugID}`);
  };

  return (
    <>
      <div className={styles.bug_bar} onClick={handleBugClick}>
        <div>{bugTitle}</div>
        <div>{bugSeverity}</div>
        <div>{bugDueDate}</div>
        <div>{createdBy}</div>
      </div>
    </>
  );
};
