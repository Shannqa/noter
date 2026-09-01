function SettingsMenu({ activeTab, setActiveTab}) {
  
  
  return (
    <div>
      <button onClick={setActiveTab("account")}>Account</button>
      <button onClick={setActiveTab("appearance")}>Appearance</button>
    </div>
  )
}

export default SettingsMenu;