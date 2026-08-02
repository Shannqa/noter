import { Link, useOutletContext, useNavigate } from "react-router";
import "./ViewNoteMenu.css";

function NoteMenu({ id, view, edit, bin, archive }) {
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

  function archiveNote() {
    setAllNotes(
      allNotes.map((item) => {
        if (item.id == id) {
          item.status = "archive";
        }
        return item;
      }),
    );
    localStorage.setItem(
      "notes",
      JSON.stringify(
        allNotes.map((item) => {
          if (item.id == id) {
            item.status = "archive";
          }
          return item;
        }),
      ),
    );
    return navigate("/");
  }

  function unarchiveNote() {
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
      {archive && (
        <button className="menu-item" onClick={archiveNote}>
          Archive note
        </button>
      )}
      {!archive && (
        <button className="menu-item" onClick={unarchiveNote}>
          Remove from archive
        </button>
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
