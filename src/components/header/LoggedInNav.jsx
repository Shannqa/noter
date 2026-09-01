import styles from "./header.module.css";
import { Link, useNavigate } from "react-router";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../App";
import RightSide from "./RightSide";
import LinkButton from "../button/LinkButton";
import Button from "../button/Button";
import MenuIcon from "../mainMenu/MenuIcon";
import MainMenuItems from "../mainMenu/MainMenuItems";

function LoggedInNav() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const buttonRef = useRef();

  // clicking outside to close the menu
  useEffect(() => {
    const clickListener = (e) => {
      if (
        menuRef.current?.contains(e.target) ||
        buttonRef.current?.contains(e.target)
      ) {
        return;
      } else {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", clickListener);
    return () => document.removeEventListener("mousedown", clickListener);
  }, []);

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
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div className={styles.nav}>
        <div className={styles.sitelogo}>
          <LinkButton to={"/"}>Noter</LinkButton>
        </div>
        <div className={styles.rightMenu}>
          <span>Hello, {user.name}</span>
          <Button onClick={logOut}>Log out</Button>
          {/* <MainMenu /> */}
          <MenuIcon
            onClick={() => setMenuOpen(!menuOpen)}
            buttonRef={buttonRef}
          />
        </div>
      </div>
      {menuOpen && (
        <MainMenuItems
          menuRef={menuRef}
          toggleMenu={() => setMenuOpen(!menuOpen)}
        />
      )}
    </>
  );
}

export default LoggedInNav;
