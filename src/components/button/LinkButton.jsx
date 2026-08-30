import styles from "./button.module.css";
import { Link } from "react-router";

function LinkButton({ children, to, style }) {
  const buttonStyle =
    style === "primary" ? styles.button : styles.buttonSecondary;
  return (
    <Link className={buttonStyle} to={to}>
      {children}
    </Link>
  );
}

export default LinkButton;
