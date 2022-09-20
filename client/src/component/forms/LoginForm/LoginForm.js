import { useState, useEffect } from "react";
import { loginUser, getUserData } from "../../../ServerConnections";
import { useNavigate } from "react-router-dom";
import { useInfoContext } from "../../../Context";
import { CircularProgress } from "@mui/material";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabledFlag, setDisabledFlag] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const { setName, setIsLoggedIn } = useInfoContext();
  const navigate = useNavigate();

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    setisLoading(true);
    loginUser(email, password)
      .then((token) => {
        localStorage.setItem("token", `${token}`);
        setIsLoggedIn(true);
        console.log(localStorage.getItem("token"));
        getUserData().then((data) => {
          setName(data.username);
          console.log(data.username);
          navigate("/dashboard");
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setDisabledFlag(false);
    if (email === "" || password === "") {
      setDisabledFlag(true);
    }
  }, [email, password]);

  return (
    <>
      <div className={styles.login_page}>
        <div className={styles.form}>
          <div className={styles.login}>
            <div className={styles.login_header}>
              <h3>Sign In</h3>
              <p>Please enter your credentials to signin.</p>
            </div>
            <form className={styles.login_form}>
              <div>
                <label htmlFor="email">
                  <b>Email</b>
                </label>
                <br />
                <input
                  type="text"
                  placeholder="email"
                  name="email"
                  onChange={(input) => setEmail(input.target.value)}
                  required
                />
                <br />
                <label htmlFor="password">
                  <b>Password</b>
                </label>
                <br />
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  onChange={(input) => setPassword(input.target.value)}
                  required
                />
                <br />
                <button
                  className={styles.signin_btn}
                  disabled={disabledFlag}
                  onClick={handleLoginSubmit}
                >
                  {isLoading ? <CircularProgress /> : "Sign In"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export { LoginForm };
