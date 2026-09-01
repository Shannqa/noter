import menu from "../../assets/menu.svg";
import styles from "./mainMenu.module.css";

function MenuIcon({ onClick, buttonRef }) {
  return (
    <img
      src={menu}
      className={styles.mainMenuIcon}
      onClick={onClick}
      ref={buttonRef}
    />
  );
}

export default MenuIcon;
