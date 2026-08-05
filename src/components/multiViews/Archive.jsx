import { useContext } from "react";
import { Link } from "react-router";
import { AppContext } from "../../App";
import NoteList from "../noteList/NoteList";

function Archive() {
  const { allNotes, setAllNotes } = useContext(AppContext);
  const notesInArchive = allNotes.filter((note) => note.status === "archive");

  return (
    <>
      <h2>Archive</h2>
      {notesInArchive.length === 0 ? (
        <p>No notes in archive.</p>
      ) : (
        <NoteList notesArray={notesInArchive} />
      )}
    </>
  );
}

export default Archive;
