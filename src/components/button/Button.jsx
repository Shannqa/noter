import styles from "./button.module.css";

function Button({ children, onClick, style = "button", className }) {
  const buttonStyle = `${styles[style]} ${className}`;

  return (
    <button className={buttonStyle} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
