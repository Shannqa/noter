import { useState, useContext } from "react";
import { useParams } from "react-router";
import { AppContext } from "../../App";
import ViewNote from "./ViewNote.jsx";
import styles from "./singleViews.module.css";

function ViewWrapper() {
  const { allNotes, categories, notesLoaded } = useContext(AppContext);
  const { id } = useParams();
  const note = allNotes.find((item) => item.id === parseInt(id));
  
  if (!notesLoaded) {
    return(
      <div className={styles.singleView}>
        <h2>View Note</h2>
        <p>Loading...</p>
      </div>
    );
  } else if (!note) {
    return(
      <div className={styles.singleView}>
        <h2>View Note</h2>
        <p>Note not found.</p>
      </div>
    )
  }
  
  return(
    <ViewNote note={note} />
  )
}

export default ViewWrapper;