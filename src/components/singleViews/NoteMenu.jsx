import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AppContext } from "../../App";
import styles from "./noteMenu.module.css";

function NoteMenu({ id, view, edit, bin, archive }) {
  const { allNotes, setAllNotes, categories } = useContext(AppContext);
  const navigate = useNavigate();

  function deleteNote() {
    const deletedDate = Date.now();
    setAllNotes(
      allNotes.map((item) => {
        if (item.id == id) {
          item.status = "bin";
          item.deletedAt = deletedDate;
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
            item.deletedAt = deletedDate;
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
          item.deletedAt = null;
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
            item.deletedAt = null;
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

  function deleteNotePermAsk() {
    // show modal - are you sure?
  }

  function deleteNotePerm() {
    setAllNotes(allNotes.filter((item) => item.id !== id));
    localStorage.setItem(
      "notes",
      JSON.stringify(allNotes.filter((item) => item.id !== id)),
    );
    return navigate("/");
  }

  return (
    <div className={styles.menu}>
      {view && (
        <Link to={`/note/${id}`} className={styles.item}>
          View
        </Link>
      )}
      {edit && (
        <Link to={"./edit"} className={styles.item}>
          Edit
        </Link>
      )}
      {archive && (
        <button className={styles.item} onClick={archiveNote}>
          Move to archive
        </button>
      )}
      {!archive && (
        <button className={styles.item} onClick={unarchiveNote}>
          Remove from archive
        </button>
      )}
      {bin && (
        <button className={styles.item} onClick={deleteNote}>
          Delete
        </button>
      )}
      {!bin && (
        <button className={styles.item} onClick={restoreNote}>
          Restore
        </button>
      )}
      {!bin && (
        <button className={styles.item} onClick={deleteNotePerm}>
          Delete permanently
        </button>
      )}
    </div>
  );
}

export default NoteMenu;
