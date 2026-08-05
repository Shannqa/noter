import { Link } from "react-router";
// import "./MainMenu.css";
import { useState, useEffect, useRef } from "react";
import MainMenuItems from "./MainMenuItems";

function MainMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const node = useRef();

  function toggleMenu() {
    if (menuOpen) {
      setMenuOpen(false);
    } else {
      setMenuOpen(true);
    }
  }

  // clicking outside to close the menu
  useEffect(() => {
    const clickListener = (e) => {
      if (!node.current || node.current.contains(e.target)) {
        return;
      } else {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", clickListener);
    return () => document.removeEventListener("mousedown", clickListener);
  }, [node]);

  // pressing esc to close the menu
  useEffect(() => {
    const keyListener = (e) => {
      if (menuOpen && e.keyCode == 27) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", keyListener);
    return () => document.removeEventListener("keydown", keyListener);
  }, [menuOpen]);

  return (
    <div className="navbar" ref={node}>
      <button className="main-menu-icon" onClick={toggleMenu}>
        =
      </button>
      {menuOpen && <MainMenuItems menuOpen={menuOpen} onClick={toggleMenu} />}
    </div>
  );
}

export default MainMenu;
