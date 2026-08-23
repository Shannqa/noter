import MainMenu from "../mainMenu/MainMenu";
import styles from "./header.module.css";
import { Link } from "react-router";
import { useContext } from "react";
import { AppContext } from "../../App";
import RightSide from "./RightSide";

function Header() {
  const { user } = useContext(AppContext);

  // console.log("Header user:", user);

  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <MainMenu />
        <div className={styles.home}>
          <h1>
            <Link to={"/"}>Home</Link>
          </h1>
          <RightSide user={user} />
        </div>
      </div>
    </div>
  );
}

export default Header;
