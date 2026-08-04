import MainMenu from "../mainMenu/MainMenu";
import styles from "./header.module.css";
import { Link } from "react-router";

function Header() {
  return (
    <div className={styles.header}>
      <MainMenu />
      <div className={styles.home}>
        <Link to={"/"}>Home</Link>
      </div>
    </div>
  );
}

export default Header;
