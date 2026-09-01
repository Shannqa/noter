import styles from "./settings.module.css";

function SettingsMenu({ activeTab, setActiveTab }) {
  return (
    <div className={styles.menuButtons}>
      <button onClick={() => setActiveTab("account")}>Account</button>
      <button onClick={() => setActiveTab("appearance")}>Appearance</button>
    </div>
  );
}

export default SettingsMenu;
