import { useState } from "react";
import Button from "../button/Button";
import styles from "./settings.module.css";

function AppearanceSettings() {
  const { theme, setTheme } = useState("default");

  async function saveSettings() {
    try {
      const response = await fetch(
        "http://localhost:3000/settings/appearance",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            theme: theme,
          }),
        },
      );
      if (!response.ok) {
        throw new Error("Failed to save settings");
      }
      const result = await response.json();
      console.log(result);
      dispatchSettings({
        type: "save_settings",
        theme: result.theme,
      });
      // add to local storage
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h2>Appearance</h2>
      <h3>Change theme</h3>
      <form className={styles.settingsSection}>
        <label htmlFor="theme">Choose the theme:</label>
        <select
          name="theme"
          id="theme-select"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          <option value="default">Default (OS)</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>{" "}
        </select>
        <Button onClick={saveSettings}>Save settings</Button>
      </form>
    </div>
  );
}

export default AppearanceSettings;
