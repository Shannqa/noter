import { Link, useNavigate } from "react-router";
import styles from "./mainMenu.module.css";
import { useContext } from "react";
import { AppContext } from "../../ProtectedLayout";

function MainMenuItems({ node, toggleMenu }) {
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
    <div className={styles.mainMenu} ref={node}>
      <Link to="/note/add" className={styles.menuItem} onClick={toggleMenu}>
        Add note
      </Link>
      <Link to="/" className={styles.menuItem} onClick={toggleMenu}>
        All notes
      </Link>
      <Link to="/categories" className={styles.menuItem} onClick={toggleMenu}>
        Categories
      </Link>
      <Link to="/archive" className={styles.menuItem} onClick={toggleMenu}>
        Archive
      </Link>
      <Link to="/bin" className={styles.menuItem} onClick={toggleMenu}>
        Bin
      </Link>
      <Link to="/settings" className={styles.menuItem} onClick={toggleMenu}>
        Settings
      </Link>
      <button className={styles.menuItem} onClick={logOut}>
        Log out
      </button>
    </div>
  );
}

export default MainMenuItems;
