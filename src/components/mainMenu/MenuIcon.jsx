import menu from "../../assets/menu.svg";
import styles from "./mainMenu.module.css";

function MenuIcon({ onClick }) {
  return <img src={menu} className={styles.mainMenuIcon} onClick={onClick} />;
}

export default MenuIcon;
