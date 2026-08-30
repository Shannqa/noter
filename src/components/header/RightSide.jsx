import { Link } from "react-router";
import styles from "./header.module.css";
import LinkButton from "../button/LinkButton";

function RightSide({ user }) {
  // console.log("Right side user:", user);
  // console.log("Right side username:", user?.name);
  if (!user) {
    return (
      <div className={styles.rightSide}>
        <span>
          <LinkButton to={"/login"}>Log In</LinkButton>
        </span>
        <span>
          <LinkButton to={"/signup"} style={"primary"}>
            Sign Up
          </LinkButton>
        </span>
      </div>
    );
  }
  return (
    <div className={styles.rightSide}>
      <p>Hello, {user.name}</p>
    </div>
  );
}

export default RightSide;
