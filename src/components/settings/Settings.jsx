import { useState } from "react";
import SettingsMenu from "./SettingsMenu.jsx";
import AccountSettings from "./AccountSettings.jsx";
import AppearanceSettings from "./AppearanceSettings.jsx";

function Settings() {
  const [activeTab, setActiveTab] = useState("account");
  
  
  return (
    <div>
    <h1>Settings</h1>
    <SettingsMenu activeTab={activeTab} setActiveTab={setActiveTab} />
    {activeTab === "account" && <AccountSettings />}
    {activeTab === "appearance" && <AppearanceSettings />}
    </div>
  )
}

export default Settings;