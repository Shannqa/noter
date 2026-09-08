import { useState, useContext } from "react";
import styles from "./login.module.css";
import { useNavigate, Link } from "react-router";
import { AuthContext } from "../../App.jsx";
import Button from "../button/Button.jsx";

function LogIn() {
  const { setUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  function checkName() {
    if (name.length === 0) {
      setNameError("Enter your username");
      return false;
    } else {
      setNameError("");
      return true;
    }
  }

  function checkPassword() {
    if (password.length === 0) {
      setPasswordError("Enter your password");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  }

  function setInputValue(e, setter, err, errSetter) {
    if (err.length > 0) {
      errSetter("");
    }
    if (errorMsg.length > 0) {
      setErrorMsg("");
    }
    setter(e.target.value);
  }

  async function sendForm(e) {
    e.preventDefault();
    const nameValidity = checkName();
    const passwordValidity = checkPassword();

    if (!nameValidity || !passwordValidity) {
      return;
    }

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
        result.error.forEach((error) => {
          if (error.path === "name") {
            setNameError(error.msg);
          }
          if (error.path === "password") {
            setPasswordError(error.msg);
          }
        });
        return;
      } else if (!response.ok) {
        console.log(result);
        setErrorMsg("Something went wrong! Try again later");
        return;
      }
      setUser(result.user);
      setName("");
      setPassword("");
      navigate("/");
    } catch (err) {
      console.log(err);
      setErrorMsg("Something went wrong! Try again later");
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
          autoFocus={true}
          onChange={(e) => setInputValue(e, setName, nameError, setNameError)}
          className={
            nameError.length === 0
              ? styles.loginInput
              : `${styles.loginInput} ${styles.invalid}`
          }
        />
        <span className={styles.inputError}>{nameError}</span>
        <label htmlFor="password" className={styles.inputLabel}>
          Password
        </label>
        <div className={styles.passwordContainer}>
          <input
            id="password"
            name="password"
            type={passwordVisibility ? "text" : "password"}
            onChange={(e) =>
              setInputValue(e, setPassword, passwordError, setPasswordError)
            }
            className={
              passwordError.length === 0
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
        <span className={styles.inputError}>{passwordError}</span>
        <span className={styles.errorMsg}>{errorMsg}</span>
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
