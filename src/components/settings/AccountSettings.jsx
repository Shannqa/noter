import { useState } from "react";
import Button from "../button/Button";
import styles from "./settings.module.css";

function AccountSettings() {
  const { currentPassword, setCurrentPassword } = useState("default");
  const { newPassword, setNewPassword } = useState("default");

  async function changePassword() {
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
      if (!response.ok) {
        throw new Error("Failed to change password");
      }
      const result = await response.json();
      console.log(result);
    } catch (err) {
      console.log(err);
    } finally {
      setCurrentPassword("");
      setNewPassword("");
    }
  }

  return (
    <div>
      <h2>Account</h2>
      <h3>Change password</h3>
      <form className={styles.settingsSection}>
        <label htmlFor="current_password">Enter your current password</label>
        <input name="current_password" value={currentPassword} />
        <label htmlFor="new_password">Enter your new password</label>
        <input name="current_password" value={newPassword} />
        <Button onClick={changePassword}>Change password</Button>
      </form>
    </div>
  );
}

export default AccountSettings;
