import styles from "./header.module.css";
import { Link } from "react-router";
import { useContext } from "react";
import { AppContext } from "../../ProtectedLayout";
import LinkButton from "../button/LinkButton";

function LoggedOutNav() {
  const { user } = useContext(AppContext);
  return (
    <div className={styles.nav}>
      <div className={styles.sitelogo}>
        <LinkButton to={"/"}>Noter</LinkButton>
      </div>
      <div className={styles.rightMenu}>
        <LinkButton to={"/login"} style={"secondary"}>
          Log In
        </LinkButton>
        <LinkButton to={"/signup"}>Sign Up</LinkButton>
      </div>
    </div>
  );
}

export default LoggedOutNav;
