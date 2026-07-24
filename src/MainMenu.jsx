import { Link } from "react-router";
import "./MainMenu.css";
import { useState } from "react";
import MainMenuItems from "./MainMenuItems";

function MainMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    if (menuOpen) {
      setMenuOpen(false);
    } else {
      setMenuOpen(true);
    }
  }

  return (
    <>
      <div className="main-menu-icon" onClick={toggleMenu}>
        =
      </div>
      {menuOpen && (
        <MainMenuItems menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      )}
    </>
  );
}

export default MainMenu;
