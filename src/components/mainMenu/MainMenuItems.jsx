import { Link } from "react-router";
import "./MainMenu.css";

function MainMenuItems({ menuOpen, onClick }) {
  return (
    <div className="main-menu">
      <div className="menu-item-icon">
        <button className="main-menu-icon" onClick={onClick}>
          =
        </button>
      </div>

      <Link to="/note/add" className="menu-item" onClick={onClick}>
        Add note
      </Link>
      <Link to="/" className="menu-item" onClick={onClick}>
        All notes
      </Link>
      <Link to="/categories" className="menu-item" onClick={onClick}>
        Categories
      </Link>
      <Link to="/archive" className="menu-item" onClick={onClick}>
        Archive
      </Link>
      <Link to="/bin" className="menu-item" onClick={onClick}>
        Bin
      </Link>
      <Link to="/settings" className="menu-item" onClick={onClick}>
        Settings
      </Link>
    </div>
  );
}

export default MainMenuItems;
