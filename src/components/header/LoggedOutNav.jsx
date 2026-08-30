import MainMenu from "../mainMenu/MainMenu";
import styles from "./header.module.css";
import { Link } from "react-router";
import { useContext } from "react";
import { AppContext } from "../../App";
import RightSide from "./RightSide";
import LinkButton from "../button/LinkButton";

function LoggedOutNav() {
  const { user } = useContext(AppContext);
  return (
    <div className={styles.nav}>
      <span>Noter</span>
      <div>
        <LinkButton to={"/login"}>Log In</LinkButton>
        <LinkButton to={"/signup"} style={"primary"}>
          Sign Up
        </LinkButton>
      </div>
    </div>
  );
}

export default LoggedOutNav;
