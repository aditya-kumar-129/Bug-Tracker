import { Link } from "react-router-dom";
import BugReportIcon from "@mui/icons-material/BugReport";
import styles from "./Welcome.module.css";

const Welcome = () => {
  return (
    <>
      <div className={styles.login_page}>
        <div className={styles.form}>
          <div className={styles.login}>
            <div className={styles.login_header}>
              <h1>Welcome to Bug-Tracker</h1>
              <div className={styles.welcomeicon}>
                <BugReportIcon style={{ fontSize: 50 }} />
              </div>

              <Link to="/login">
                <button className={styles.signin_btn}>Login</button>
              </Link>
              <Link to="/register">
                <button className={styles.signup_btn}>Register</button>
              </Link>

              <Link to="/dashboard">
                <button className={styles.dashboard_btn}>Dashboard</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
