import { Link } from "react-router";
import styles from "./addButton.module.css";

function AddButton() {
  function handleClick() {}

  return (
    <Link to="note/add" className={styles.addPlusButton}>
      <div>+</div>
    </Link>
  );
}

export default AddButton;
