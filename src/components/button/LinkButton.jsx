import styles from "./button.module.css";
import { Link } from "react-router";

function LinkButton({ children, to, style = "button", className }) {
  const buttonStyle = `${styles[style]} ${className}`;

  return (
    <Link className={buttonStyle} to={to}>
      {children}
    </Link>
  );
}

export default LinkButton;
