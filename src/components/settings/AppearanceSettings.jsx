import { useState, useContext } from "react";
import Button from "../button/Button";
import styles from "./settings.module.css";
import { AppContext } from "../../ProtectedLayout";

function AppearanceSettings() {
  const { settings } = useContext(AppContext);
  const [theme, setTheme] = useState(settings?.theme);

  async function saveSettings(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/settings", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          theme: theme,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to save settings");
      }
      const result = await response.json();
      console.log(result);
      // dispatchSettings({
      //   type: "save_settings",
      //   theme: result.theme,
      // });
      // add to local storage
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h2>Appearance</h2>
      <h3>Change theme</h3>
      <form className={styles.settingsSection} method="post">
        <label htmlFor="theme">Choose the theme:</label>
        <select
          name="theme"
          id="theme-select"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          <option value="DEFAULT">Default (OS)</option>
          <option value="LIGHT">Light</option>
          <option value="DARK">Dark</option>{" "}
        </select>
        <Button onClick={(e) => saveSettings(e)}>Save settings</Button>
      </form>
    </div>
  );
}

export default AppearanceSettings;
