import { useState } from "react";
import { useParams, useOutletContext } from "react-router";
import ViewNoteMenu from "./ViewNoteMenu";
import "./ViewNote.css";

function Note() {
  const { allNotes } = useOutletContext();
  const { id } = useParams();
  const note = allNotes.find((item) => item.id === id);

  if (!note) {
    return <h2>No note found</h2>;
  }

  return (
    <>
      <h2>View note</h2>
      <div className="view-note">
        <div className="note-title">{note.title}</div>
        <div className="note-body">{note.body}</div>
      </div>
      <ViewNoteMenu id={id} />
    </>
  );
}

export default Note;
