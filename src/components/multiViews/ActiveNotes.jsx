import { useState, useContext } from "react";
import { Link } from "react-router";
import { AppContext } from "../../App";
import NoteList from "../noteList/NoteList";
import AddButton from "../addButon/AddButton";

function ActiveNotes() {
  const { user, allNotes } = useContext(AppContext);

  if (!allNotes) {
    return (
      <>
        <h2>All notes</h2>
        <p>Loading...</p>
      </>
    );
  }

  const notesActive = allNotes.filter((note) => note.status === "ACTIVE");

  return (
    <>
      <h2>All notes</h2>
      <NoteList notesArray={notesActive} />,
      <AddButton />
    </>
  );
}

export default ActiveNotes;
