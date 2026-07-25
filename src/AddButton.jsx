import { Link } from "react-router";
import "./AddButton.css";

function AddButton() {
  function handleClick() {}

  return (
    <Link to="note/add" className="add-plus-button">
      <div>+</div>
    </Link>
  );
}

export default AddButton;
