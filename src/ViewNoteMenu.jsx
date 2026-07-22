import { Link } from "react-router";

function ViewNoteMenu({ id }) {
  return (
    <div className="view-note-menu">
      <Link to={"./edit"} className="menu-item">
        Edit
      </Link>
      <button className="menu-item">Delete note</button>
    </div>
  );
}

export default ViewNoteMenu;
