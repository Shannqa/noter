import { Link, useNavigate } from "react-router";
import "./MainMenu.css";
import { useContext } from "react";
import { AppContext } from "../../ProtectedLayout";

function MainMenuItems({ menuOpen, toggleMenu }) {
  const { setUser, dispatchNotes, dispatchCategories } = useContext(AppContext);
  const navigate = useNavigate();

  async function logOut() {
    try {
      const response = await fetch("http://localhost:3000/user/logout", {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to log out");
      } else {
        console.log("logout");
        setUser(null);
        dispatchNotes({
          type: "reset",
        });
        dispatchCategories({
          type: "reset",
        });
        toggleMenu();
        navigate("/");
        // onClick(); // toggle menu
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="main-menu">
      <div className="menu-item-icon">
        <button className="main-menu-icon" onClick={toggleMenu}>
          =
        </button>
      </div>

      <Link to="/note/add" className="menu-item" onClick={toggleMenu}>
        Add note
      </Link>
      <Link to="/" className="menu-item" onClick={toggleMenu}>
        All notes
      </Link>
      <Link to="/categories" className="menu-item" onClick={toggleMenu}>
        Categories
      </Link>
      <Link to="/archive" className="menu-item" onClick={toggleMenu}>
        Archive
      </Link>
      <Link to="/bin" className="menu-item" onClick={toggleMenu}>
        Bin
      </Link>
      <Link to="/settings" className="menu-item" onClick={toggleMenu}>
        Settings
      </Link>
      <button className="menu-item" onClick={logOut}>
        Log out
      </button>
    </div>
  );
}

export default MainMenuItems;
