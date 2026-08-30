import { useState, useContext } from "react";
import { useParams } from "react-router";
import { AppContext } from "../../ProtectedLayout";
import EditContent from "./EditContent.jsx";
import styles from "./singleViews.module.css";

function EditNote() {
  const { allNotes, categories, notesLoaded } = useContext(AppContext);
  const { id } = useParams();
  const note = allNotes.find((item) => item.id === parseInt(id));

  if (!notesLoaded) {
    return (
      <div className={styles.singleView}>
        <h2>Edit Note</h2>
        <p>Loading...</p>
      </div>
    );
  } else if (!note) {
    return (
      <div className={styles.singleView}>
        <h2>Edit Note</h2>
        <p>Note not found.</p>
      </div>
    );
  }

  return <EditContent note={note} />;
}

export default EditNote;
