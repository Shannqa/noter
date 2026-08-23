import MainMenu from "../mainMenu/MainMenu";
import styles from "./header.module.css";
import { Link } from "react-router";

function Header() {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <MainMenu />
        <div className={styles.home}>
          <h1>
            <Link to={"/"}>Home</Link>
          </h1>
          <div className={styles.rightSide}>
            <span>
              <Link to={"/signup"}>Sign Up</Link>
            </span>
            <span>
              <Link to={"/login"}>Log In</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
