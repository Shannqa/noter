import { useState, useContext } from "react";
import styles from "./login.module.css";
import { useNavigate, Link } from "react-router";
import { AuthContext } from "../../App.jsx";
import Button from "../button/Button.jsx";

function LogIn() {
  const { setUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const navigate = useNavigate();

  async function sendForm(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: name,
          password: password,
        }),
      });

      const result = await response.json();
      // console.log(result);

      if (result.error?.length > 0) {
        // console.log(result.error);
        setLoginError(result.error);
        return;
      } else if (result.message?.length > 0) {
        console.log(result.message);
        setLoginError(result.message);
        return;
      }

      setUser(result.user);
      setName("");
      setPassword("");
      navigate("/");
    } catch (err) {
      console.log(err);
      setLoginError(`Error! ${err}`);
    }
  }

  return (
    <div className={styles.view}>
      <form className={styles.loginForm}>
        <h1 className={styles.formLabel}>Welcome back!</h1>
        <label htmlFor="name" className={styles.inputLabel}>
          Username
        </label>
        <input
          id="name"
          name="name"
          onChange={(e) => setName(e.target.value)}
          className={
            loginError.length === 0
              ? styles.loginInput
              : `${styles.loginInput} ${styles.invalid}`
          }
        />
        <label htmlFor="password" className={styles.inputLabel}>
          Password
        </label>
        <div className={styles.passwordContainer}>
          <input
            id="password"
            name="password"
            type={passwordVisibility ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            className={
              loginError.length === 0
                ? styles.loginInput
                : `${styles.loginInput} ${styles.invalid}`
            }
          />
          <input
            type="checkbox"
            onClick={() => setPasswordVisibility(!passwordVisibility)}
            className={styles.passwordCheckbox}
          />
        </div>
        <span className={styles.inputError}>{loginError}</span>
        <Button onClick={(e) => sendForm(e)} className={styles.formButton}>
          Log in
        </Button>
        {/* <div className={styles.extraText}>
          <span>
            <Link to="/forgot_password">Forgot your password?</Link>
          </span>
        </div> */}
      </form>
    </div>
  );
}

export default LogIn;
