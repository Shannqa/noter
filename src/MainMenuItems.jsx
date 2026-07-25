import { Link } from "react-router";
import "./MainMenu.css";

function MainMenuItems({ menuOpen, onClick }) {
  return (
    <div className="main-menu">
      <div className="main-menu-icon" onClick={onClick}>
        =
      </div>
      <Link to="/" className="menu-item" onClick={onClick}>
        All notes
      </Link>
      <Link to="/" className="menu-item" onClick={onClick}>
        Categories
      </Link>
      <Link to="/" className="menu-item" onClick={onClick}>
        Archive
      </Link>
      <Link to="/" className="menu-item" onClick={onClick}>
        Bin
      </Link>
      <Link to="/" className="menu-item" onClick={onClick}>
        Settings
      </Link>
    </div>
  );
}

export default MainMenuItems;
