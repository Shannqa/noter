import { Link, useOutletContext, useNavigate } from "react-router";
import "./ViewNoteMenu.css";

function NoteMenu({ id, view, edit, bin }) {
  const { allNotes, setAllNotes, categories } = useOutletContext();
  const navigate = useNavigate();

  function deleteNote() {
    setAllNotes(
      allNotes.map((item) => {
        if (item.id == id) {
          item.status = "bin";
        }
        return item;
      }),
    );
    localStorage.setItem(
      "notes",
      JSON.stringify(
        allNotes.map((item) => {
          if (item.id == id) {
            item.status = "bin";
          }
          return item;
        }),
      ),
    );
    return navigate("/");
  }

  function restoreNote() {
    setAllNotes(
      allNotes.map((item) => {
        if (item.id == id) {
          item.status = "active";
        }
        return item;
      }),
    );
    localStorage.setItem(
      "notes",
      JSON.stringify(
        allNotes.map((item) => {
          if (item.id == id) {
            item.status = "active";
          }
          return item;
        }),
      ),
    );
    return navigate("/");
  }

  return (
    <div className="view-note-menu">
      {view && (
        <Link to={`/note/${id}`} className="menu-item">
          View
        </Link>
      )}
      {edit && (
        <Link to={"./edit"} className="menu-item">
          Edit
        </Link>
      )}
      {bin && (
        <button className="menu-item" onClick={deleteNote}>
          Delete note
        </button>
      )}
      {!bin && (
        <button className="menu-item" onClick={restoreNote}>
          Restore note
        </button>
      )}
    </div>
  );
}

export default NoteMenu;
