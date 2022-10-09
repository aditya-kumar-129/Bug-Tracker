import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./BugListMaterialUI.module.css";

const BugListMaterialUI = ({ bugsArray }) => {
  const navigate = useNavigate();
  const bugTableHeaders = [
    "Title",
    "Severity",
    "Created By",
    "Status",
    "Due Date",
  ];
  const handleBugClick = (bugID) => {
    navigate(`/bug/${bugID}`);
  };

  return (
    <Paper className={styles.detailpaper} variant="outlined">
      <Table>
        <TableHead>
          <TableRow className={styles.mainbugrow}>
            {bugTableHeaders.map((t) => (
              <TableCell key={t} align="center">
                {t}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody className={styles.bugtablebody}>
          {bugsArray.map((bug) => (
            <TableRow
              key={bug._id}
              className={styles.bugtablerow}
              onClick={() => handleBugClick(bug._id)}
            >
              <TableCell align="center">{bug.bugTitle}</TableCell>
              <TableCell align="center">{bug.bugSeverity}</TableCell>
              <TableCell align="center">{bug.createdBy}</TableCell>
              <TableCell align="center">{bug.bugStatus}</TableCell>
              <TableCell align="center">{bug.bugDueDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default BugListMaterialUI;
