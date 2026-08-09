import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AppContext } from "../../App";
import styles from "./noteMenu.module.css";

function NoteMenu({ id, view, edit, bin, archive }) {
  const { allNotes, dispatch, categories } = useContext(AppContext);
  const navigate = useNavigate();

  function deleteNote() {
    const deletedDate = Date.now();
    dispatch({
      type: "bin_note",
      id: id,
      deletedDate: deletedDate,
    });

    // setAllNotes(
    //   allNotes.map((item) => {
    //     if (item.id == id) {
    //       item.status = "bin";
    //       item.deletedAt = deletedDate;
    //     }
    //     return item;
    //   }),
    // );
    // localStorage.setItem(
    //   "notes",
    //   JSON.stringify(
    //     allNotes.map((item) => {
    //       if (item.id == id) {
    //         item.status = "bin";
    //         item.deletedAt = deletedDate;
    //       }
    //       return item;
    //     }),
    //   ),
    // );
    return navigate("/");
  }

  function unbinNote() {
    dispatch({
      type: "unbin_note",
      id: id,
    });

    // setAllNotes(
    //   allNotes.map((item) => {
    //     if (item.id == id) {
    //       item.status = "active";
    //       item.deletedAt = null;
    //     }
    //     return item;
    //   }),
    // );
    // localStorage.setItem(
    //   "notes",
    //   JSON.stringify(
    //     allNotes.map((item) => {
    //       if (item.id == id) {
    //         item.status = "active";
    //         item.deletedAt = null;
    //       }
    //       return item;
    //     }),
    //   ),
    // );
    return navigate("/");
  }

  function archiveNote() {
    dispatch({
      type: "archive_note",
      id: id,
    });
    // setAllNotes(
    //   allNotes.map((item) => {
    //     if (item.id == id) {
    //       item.status = "archive";
    //     }
    //     return item;
    //   }),
    // );
    // localStorage.setItem(
    //   "notes",
    //   JSON.stringify(
    //     allNotes.map((item) => {
    //       if (item.id == id) {
    //         item.status = "archive";
    //       }
    //       return item;
    //     }),
    //   ),
    // );
    return navigate("/");
  }

  function unarchiveNote() {
    dispatch({
      type: "unarchive_note",
      id: id,
    });
    // setAllNotes(
    //   allNotes.map((item) => {
    //     if (item.id == id) {
    //       item.status = "active";
    //     }
    //     return item;
    //   }),
    // );
    // localStorage.setItem(
    //   "notes",
    //   JSON.stringify(
    //     allNotes.map((item) => {
    //       if (item.id == id) {
    //         item.status = "active";
    //       }
    //       return item;
    //     }),
    //   ),
    // );
    return navigate("/");
  }

  function deleteNotePermAsk() {
    // show modal - are you sure?
  }

  function deleteNotePerm() {
    // setAllNotes(allNotes.filter((item) => item.id !== id));
    // localStorage.setItem(
    //   "notes",
    //   JSON.stringify(allNotes.filter((item) => item.id !== id)),
    // );
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
        <button className={styles.item} onClick={unbinNote}>
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
