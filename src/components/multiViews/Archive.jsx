import { useOutletContext, Link } from "react-router";
import NoteList from "../noteList/NoteList";

function Archive() {
  const { allNotes, setAllNotes } = useOutletContext();
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
