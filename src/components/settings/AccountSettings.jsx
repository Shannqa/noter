import { useState } from "react";
import Button from "../button/Button";
import styles from "./settings.module.css";

function AccountSettings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  function validatePassword() {
    if (newPassword.length < 5) {
      setErrorMsg("Password must have at least 4 characters");
      return false;
    } else if (newPassword.length > 128) {
      setErrorMsg("Password may not exceed 128 characters");
      return false;
    } else {
      setErrorMsg("");
      return true;
    }
  }

  function setPassword(e, setter) {
    if (errorMsg.length > 0) {
      setErrorMsg("");
    }
    setter(e.target.value);
  }

  async function changePassword(e) {
    console.log("change");
    e.preventDefault();
    const checkValidity = validatePassword();

    if (!checkValidity) {
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

      if (!response.ok) {
        // console.log("response ", response);
        if (result.message) {
          // console.log("reserror ", result.message);
          setErrorMsg(result.message);
        } else {
          setErrorMsg("Oops! Something went wrong");
        }
      }
      setSuccessMsg("Password changed");
      setCurrentPassword("");
      setNewPassword("");
      // console.log(result);
    } catch (err) {
      if (!response.ok) {
        // console.log("response ", response);
        if (result.message) {
          // console.log("reserror ", result.message);
          setErrorMsg(result.message);
        } else {
          setErrorMsg("Oops! Something went wrong");
        }
      }
    }
  }

  return (
    <div>
      <h2>Account</h2>
      <h3>Change password</h3>
      <form className={styles.settingsSection} method="POST">
        <label htmlFor="current_password">Enter your current password</label>
        <input
          name="current_password"
          value={currentPassword}
          type="password"
          onChange={(e) => setPassword(e, setCurrentPassword)}
        />
        <label htmlFor="new_password">Enter your new password</label>
        <input
          name="new_password"
          value={newPassword}
          type="password"
          onChange={(e) => setPassword(e, setNewPassword)}
        />
        <span className={styles.errorMsg}>{errorMsg}</span>
        <span className={styles.successMsg}>{successMsg}</span>
        <Button onClick={(e) => changePassword(e)}>Change password</Button>
      </form>
    </div>
  );
}

export default AccountSettings;
