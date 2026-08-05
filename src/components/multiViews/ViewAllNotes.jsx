import { useState, useContext } from "react";
import { Link } from "react-router";
import { AppContext } from "../../App";
import NoteList from "../noteList/NoteList";
import AddButton from "../addButon/AddButton";

function ViewAllNotes() {
  const { allNotes, setAllNotes } = useContext(AppContext);
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
