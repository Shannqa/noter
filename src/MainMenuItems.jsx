import { Link } from "react-router";

function MainMenuItems({ menuOpen, setMenuOpen }) {
  return (
    <div className="main-menu">
      <Link to="/" className="menu-item" onClick={setMenuOpen(false)}>
        All notes
      </Link>
      <Link to="/" className="menu-item" onClick={setMenuOpen(false)}>
        Categories
      </Link>
      <Link to="/" className="menu-item" onClick={setMenuOpen(false)}>
        Archive
      </Link>
      <Link to="/" className="menu-item" onClick={setMenuOpen(false)}>
        Bin
      </Link>
      <Link to="/" className="menu-item" onClick={setMenuOpen(false)}>
        Settings
      </Link>
    </div>
  );
}

export default MainMenuItems;
