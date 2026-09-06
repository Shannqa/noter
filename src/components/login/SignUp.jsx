import { useState } from "react";
import { Link } from "react-router";
import styles from "./login.module.css";
import Button from "../button/Button.jsx";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function checkName() {
    if (name.length < 2 || name.length > 128) {
      setNameError("Username must be between 2 and 128 characters");
      return false;
    } else {
      setNameError("");
      return true;
    }
  }

  function checkEmail() {
    if (!emailRegex.test(email)) {
      setEmailError("Not a valid email address");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  }

  function checkPassword() {
    if (password.length < 5 || password.length > 128) {
      setPasswordError("Password must be between 4 and 128 characters");
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
    setter(e.target.value);
  }

  async function sendForm(e) {
    e.preventDefault();

    const nameValidity = checkName();
    const emailValidity = checkEmail();
    const passwordValidity = checkPassword();

    if (!nameValidity || !emailValidity || !passwordValidity) {
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/user/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });

      const result = await response.json();

      if (result.error?.length > 0) {
        // console.log(result.error);

        result.error.forEach((error) => {
          if (error.path === "name") {
            setNameError(error.msg);
          }
          if (error.path === "email") {
            setEmailError(error.msg);
          }
          if (error.path === "password") {
            setPasswordError(error.msg);
          }
        });
      }
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.view}>
      <form className={styles.loginForm}>
        <h1 className={styles.formLabel}>Create account</h1>
        <label htmlFor="name" className={styles.inputLabel}>
          Username
        </label>
        <input
          id="name"
          name="name"
          onChange={(e) => setInputValue(e, setName, nameError, setNameError)}
          className={
            nameError.length === 0
              ? styles.loginInput
              : `${styles.loginInput} ${styles.invalid}`
          }
        />
        <span className={styles.inputError}>{nameError}</span>
        <label htmlFor="email" className={styles.inputLabel}>
          Email
        </label>
        <input
          id="email"
          name="email"
          onChange={(e) =>
            setInputValue(e, setEmail, emailError, setEmailError)
          }
          className={
            emailError.length === 0
              ? styles.loginInput
              : `${styles.loginInput} ${styles.invalid}`
          }
        />
        <span className={styles.inputError}>{emailError}</span>
        <label htmlFor="password" className={styles.inputLabel}>
          Password
        </label>
        <div className={styles.passwordContainer}>
          <input
            id="password"
            name="password"
            onChange={(e) =>
              setInputValue(e, setPassword, passwordError, setPasswordError)
            }
            type={passwordVisibility ? "text" : "password"}
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
        <Button onClick={(e) => sendForm(e)} className={styles.formButton}>
          Sign up
        </Button>
        <div className={styles.extraText}>
          <span>
            Already have an account? <Link to="/login">Log in</Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
