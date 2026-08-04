import { useState } from "react";
import { Link, useOutletContext } from "react-router";
import AddButton from "../../AddButton";
import NoteList from "../noteList/NoteList";

function ViewAllNotes() {
  const { allNotes, setAllNotes } = useOutletContext();
  const notesActive = allNotes.filter((note) => note.status === "active");

  function clearStorage() {
    localStorage.clear();
    setAllNotes([]);
  }

  return (
    <>
      <h2>All notes</h2>
      <NoteList notesArray={notesActive} />
      <button onClick={clearStorage}>Clear storage</button>
      <AddButton />
    </>
  );
}

export default ViewAllNotes;
