import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AppContext } from "../../App";
import styles from "./noteMenu.module.css";

function NoteMenu({ id, view, edit, bin, archive, setOpenDialog }) {
  const { allNotes, dispatchNotes, categories } = useContext(AppContext);
  const navigate = useNavigate();

  function deleteNote() {
    const date = Date.now();
    dispatchNotes({
      type: "bin_note",
      id: id,
      deletedAt: date,
    });

    return navigate("/");
  }

  function unbinNote() {
    dispatchNotes({
      type: "unbin_note",
      id: id,
    });

    return navigate("/");
  }

  function archiveNote() {
    dispatchNotes({
      type: "archive_note",
      id: id,
    });

    return navigate("/");
  }

  function unarchiveNote() {
    dispatchNotes({
      type: "unarchive_note",
      id: id,
    });

    return navigate("/");
  }

  function deleteNotePermAsk() {
    // show modal - are you sure?
    setOpenDialog();
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
        <button className={styles.item} onClick={unbinNote}>
          Restore
        </button>
      )}
      {!bin && (
        <button className={styles.item} onClick={deleteNotePermAsk}>
          Delete permanently
        </button>
      )}
    </div>
  );
}

export default NoteMenu;
