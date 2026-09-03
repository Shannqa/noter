import { useState } from "react";
import Button from "../button/Button";
import styles from "./settings.module.css";

function AccountSettings() {
  const [currentPassword, setCurrentPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);

  async function changePassword(e) {
    console.log("change");
    e.preventDefault();
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
      console.log(response);
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
      <form className={styles.settingsSection} method="POST">
        <label htmlFor="current_password">Enter your current password</label>
        <input
          name="current_password"
          value={currentPassword}
          type="password"
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <label htmlFor="new_password">Enter your new password</label>
        <input
          name="new_password"
          value={newPassword}
          type="password"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Button onClick={(e) => changePassword(e)}>Change password</Button>
      </form>
    </div>
  );
}

export default AccountSettings;
