import { useState, useContext } from "react";
import { useParams } from "react-router";
import { AppContext } from "../../ProtectedLayout";
import ViewContent from "./ViewContent.jsx";
import styles from "./singleViews.module.css";

function ViewNote() {
  const { allNotes, categories, loaded } = useContext(AppContext);
  const { id } = useParams();
  const note = allNotes.find((item) => item.id === parseInt(id));
  console.log(note);

  if (!loaded) {
    return (
      <div className={styles.singleView}>
        <h1>View Note</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (!note) {
    return (
      <div className={styles.singleView}>
        <h1>View Note</h1>
        <p>Note not found.</p>
      </div>
    );
  }

  return <ViewContent note={note} />;
}

export default ViewNote;
