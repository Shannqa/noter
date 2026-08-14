import { Link } from "react-router";
import styles from "./singleNoteMenu.module.css";

function SingleNoteMenuItems({
  id,
  view,
  edit,
  archive,
  bin,
  menuOpen,
  onClick,
  archiveNote,
  unarchiveNote,
  deleteNote,
  unbinNote,
  deleteNotePermAsk,
}) {
  return (
    <div className={styles.menuItems}>
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

export default SingleNoteMenuItems;
