import { useEffect, useState } from "react";
import { registerUser } from "../../../ServerConnections";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import styles from "./RegisterForm.module.css";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disabledFlag, setDisabledFlag] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();

  let passwordMatch = password === confirmPassword ? true : false;

  useEffect(() => {
    passwordMatch = password === confirmPassword ? true : false;

    setDisabledFlag(false);
    if (
      name === "" ||
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setDisabledFlag(true);
    }
  }, [name, username, email, password, confirmPassword, disabledFlag]);

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    setisLoading(true);
    if (!passwordMatch) alert("Password and current password not matched");

    registerUser(name, username, email, password)
      .then((statusCode) => {
        if (statusCode === 200) navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className={styles.login_page}>
        <div className={styles.form}>
          <div className={styles.login}>
            <div className={styles.login_header}>
              <h3>Register</h3>
              <p>Please enter your credentials to register.</p>
            </div>
            <form className={styles.login_form}>
              <div>
                <label htmlFor="name">
                  <b>Name</b>
                </label>
                <input
                  type="text"
                  placeholder="name"
                  value={name}
                  onChange={(input) => setName(input.target.value)}
                  name="name"
                  required
                />
                <label htmlFor="username">
                  <b>UserName</b>
                </label>
                <input
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(input) => setUserName(input.target.value)}
                  name="username"
                  required
                />
                <label htmlFor="email">
                  <b>Email</b>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  value={email}
                  onChange={(input) => setEmail(input.target.value)}
                  name="email"
                  required
                />
                <label htmlFor="password">
                  <b>Password</b>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(input) => setPassword(input.target.value)}
                  name="password"
                  required
                />
                <label htmlFor="confirmpassword">
                  <b>Confirm Password</b>
                </label>
                <input
                  type="password"
                  placeholder="confirm password"
                  value={confirmPassword}
                  onChange={(input) => setConfirmPassword(input.target.value)}
                  name="confirmpassword"
                  required
                />
                <button
                  className={styles.signup_btn}
                  disabled={disabledFlag}
                  onClick={handleRegisterSubmit}
                >
                  {isLoading ? <CircularProgress /> : "Sign Up"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export { RegisterForm };
