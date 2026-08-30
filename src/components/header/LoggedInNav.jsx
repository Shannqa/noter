import MainMenu from "../mainMenu/MainMenu";
import styles from "./header.module.css";
import { Link, useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../App";
import RightSide from "./RightSide";
import LinkButton from "../button/LinkButton";
import Button from "../button/Button";

function LoggedInNav() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

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
    <div className={styles.nav}>
      <div className={styles.sitelogo}>
        <LinkButton to={"/"}>Noter</LinkButton>
      </div>
      <div>
        <span>Hello, {user.name}</span>
        <Button onClick={logOut}>Log out</Button>
      </div>
    </div>
  );
}

export default LoggedInNav;
