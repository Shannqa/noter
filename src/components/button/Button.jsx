import styles from "./button.module.css";

function Button({ children, onClick, style }) {
  const buttonStyle =
    style === "primary" ? styles.button : styles.buttonSecondary;
  return (
    <button className={buttonStyle} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
