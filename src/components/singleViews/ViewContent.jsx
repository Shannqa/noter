import { useState, useContext, useEffect } from "react";
import { useParams, Link } from "react-router";
import { AppContext } from "../../App";
import styles from "./singleViews.module.css";
import DeleteNoteDialog from "../dialogs/DeleteNoteDialog";
import SingleNoteMenu from "../singleNoteMenu/SingleNoteMenu";

function ViewContent({ note }) {
  const { allNotes, categories } = useContext(AppContext);
  const { id } = useParams();
  const [openDialog, setOpenDialog] = useState(false);
  console.log(note.category);
  return (
    <div className={styles.singleView}>
      <div className={styles.viewHeading}>
        <h2>View Note</h2>
        <SingleNoteMenu
          id={id}
          edit={true}
          bin={note.status == "BIN" ? false : true}
          archive={note.status == "ARCHIVE" ? false : true}
          setOpenDialog={() => setOpenDialog(true)}
        />
      </div>

      <div className={styles.note}>
        <div className={styles.title}>{note.title}</div>
        <div className={styles.body}>{note.body}</div>
      </div>
      {note.category && (
        <Link to={`/categories/${note.category.id}`}>{note.category.name}</Link>
      )}
      <div className={styles.dateList}>
        <p>Created at: {new Date(note.createdAt).toLocaleString("pl-PL")}</p>
        <p>
          Last edited at: {new Date(note.updatedAt).toLocaleString("pl-PL")}
        </p>
      </div>

      <DeleteNoteDialog
        id={id}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </div>
  );
}

export default ViewContent;
