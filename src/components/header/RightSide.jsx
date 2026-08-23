import { Link } from "react-router";
import styles from "./header.module.css";

function RightSide({ user }) {
  // console.log("Right side user:", user);
  // console.log("Right side username:", user?.name);
  if (!user) {
    return (
      <div className={styles.rightSide}>
        <span>
          <Link to={"/signup"}>Sign Up</Link>
        </span>
        <span>
          <Link to={"/login"}>Log In</Link>
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
