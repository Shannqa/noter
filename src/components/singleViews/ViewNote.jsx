import { useState, useContext, useEffect } from "react";
import { useParams, Link } from "react-router";
import { AppContext } from "../../App";
import SingleView from "./SingleView";
import styles from "./singleViews.module.css";
import DeleteNoteDialog from "../dialogs/DeleteNoteDialog";
import SingleNoteMenu from "../singleNoteMenu/SingleNoteMenu";

function ViewNote() {
  const { allNotes, categories } = useContext(AppContext);
  const { id } = useParams();
  const note = allNotes.find((item) => item.id === parseInt(id));
  const [openDialog, setOpenDialog] = useState(false);

  if (!note) {
    return (
      <SingleView title="View note">
        <p>Loading...</p>
      </SingleView>
    );
  }

  /**** ADD: new component with the content of the note which is rendered once the notes are fetched ****/
  return (
    <SingleView title="View note">
      <div className={styles.viewHeading}>
        <h2>View Note</h2>
        <SingleNoteMenu
          id={id}
          edit={true}
          bin={note.status == "bin" ? false : true}
          archive={note.status == "archive" ? false : true}
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
          Last edited at: {new Date(note.lastEditedAt).toLocaleString("pl-PL")}
        </p>
      </div>

      <DeleteNoteDialog
        id={id}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </SingleView>
  );
}

export default ViewNote;
