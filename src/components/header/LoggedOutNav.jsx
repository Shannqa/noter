import MainMenu from "../mainMenu/MainMenu";
import styles from "./header.module.css";
import { Link } from "react-router";
import { useContext } from "react";
import { AppContext } from "../../ProtectedLayout";
import RightSide from "./RightSide";
import LinkButton from "../button/LinkButton";

function LoggedOutNav() {
  const { user } = useContext(AppContext);
  return (
    <div className={styles.nav}>
      <div className={styles.sitelogo}>
        <LinkButton to={"/"}>Noter</LinkButton>
      </div>
      <div className={styles.rightMenu}>
        <LinkButton to={"/login"}>Log In</LinkButton>
        <LinkButton to={"/signup"} style={"primary"}>
          Sign Up
        </LinkButton>
      </div>
    </div>
  );
}

export default LoggedOutNav;
