import { useState } from "react";
import SettingsMenu from "./SettingsMenu.jsx";
import AccountSettings from "./AccountSettings.jsx";
import AppearanceSettings from "./AppearanceSettings.jsx";
import styles from "./settings.module.css";

function Settings() {
  const [activeTab, setActiveTab] = useState("account");

  console.log(activeTab);

  return (
    <div className={styles.settingsPage}>
      <h1>Settings</h1>
      <SettingsMenu activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "account" && <AccountSettings />}
      {activeTab === "appearance" && <AppearanceSettings />}
    </div>
  );
}

export default Settings;
