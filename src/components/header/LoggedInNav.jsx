import MainMenu from "../mainMenu/MainMenu";
import styles from "./header.module.css";
import { Link } from "react-router";
import { useContext } from "react";
import { AppContext } from "../../App";
import RightSide from "./RightSide";

function LoggedInNav() {
  const { user } = useContext(AppContext);
  return (
    <div className={styles.nav}>
      <span>Noter</span>
    </div>
  );
}

export default LoggedInNav;
