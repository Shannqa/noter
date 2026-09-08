import { useState } from "react";
import Button from "../button/Button";
import styles from "./settings.module.css";

function AccountSettings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [currentError, setCurrentError] = useState("");
  const [newError, setNewError] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  function checkCurrentPassword() {
    if (currentPassword.length === 0) {
      setCurrentError("Current password is required");
      return false;
    } else {
      setCurrentError("");
      return true;
    }
  }

  function checkNewPassword() {
    if (newPassword.length < 4 || newPassword.length > 128) {
      setNewError("Password must be between 4 and 128 characters");
      return false;
    } else {
      setNewError("");
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
    const currentValidity = checkCurrentPassword();
    const newValidity = checkNewPassword();

    if (!currentValidity || !newValidity) {
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/settings/change_password",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            currentPassword: currentPassword,
            newPassword: newPassword,
          }),
        },
      );

      const result = await response.json();
      // console.log(result);

      if (result.error?.length > 0) {
        // console.log(result.error);

        result.error.forEach((error) => {
          if (error.path === "currentPassword") {
            setCurrentError(error.msg);
          }
          if (error.path === "newPassword") {
            setNewError(error.msg);
          }
        });
        return;
      } else if (!response.ok) {
        console.log(result);
        setErrorMsg("Something went wrong! Try again later");
        return;
      }
      setSuccessMsg("Password changed!");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      console.log(err);
      setErrorMsg("Something went wrong! Try again later");
    }
  }

  return (
    <div>
      <h2>Account</h2>
      <h3>Change password</h3>
      <form className={styles.settingsSection} method="POST">
        <label htmlFor="current_password" className={styles.inputLabel}>
          Enter your current password
        </label>
        <div className={styles.passwordContainer}>
          <input
            autoFocus={true}
            id="current_password"
            name="current_password"
            value={currentPassword}
            type={passwordVisibility ? "text" : "password"}
            onChange={(e) =>
              setInputValue(
                e,
                setCurrentPassword,
                currentError,
                setCurrentError,
              )
            }
            className={
              currentError.length === 0
                ? styles.formInput
                : `${styles.formInput} ${styles.invalid}`
            }
          />
          <input
            type="checkbox"
            onChange={() => setPasswordVisibility(!passwordVisibility)}
            className={styles.passwordCheckbox}
          />
        </div>
        <span className={styles.inputError}>{currentError}</span>
        <label htmlFor="new_password" className={styles.inputLabel}>
          Enter your new password
        </label>
        <div className={styles.passwordContainer}>
          <input
            id="new_password"
            name="new_password"
            value={newPassword}
            type={passwordVisibility ? "text" : "password"}
            checked={passwordVisibility}
            onChange={(e) =>
              setInputValue(e, setNewPassword, newError, setNewError)
            }
            className={
              newError.length === 0
                ? styles.formInput
                : `${styles.formInput} ${styles.invalid}`
            }
          />
          <input
            type="checkbox"
            onChange={() => setPasswordVisibility(!passwordVisibility)}
            className={styles.passwordCheckbox}
            checked={passwordVisibility}
          />
        </div>
        <span className={styles.inputError}>{newError}</span>
        <span className={styles.errorMsg}>{errorMsg}</span>
        <span className={styles.successMsg}>{successMsg}</span>
        <Button onClick={(e) => sendForm(e)} className={styles.formButton}>
          Change password
        </Button>
      </form>
    </div>
  );
}

export default AccountSettings;
