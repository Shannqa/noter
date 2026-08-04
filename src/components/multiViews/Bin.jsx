import { useOutletContext, Link } from "react-router";
import NoteList from "../noteList/NoteList";

function Bin() {
  const { allNotes, setAllNotes } = useOutletContext();
  const notesInBin = allNotes.filter((note) => note.status === "bin");

  return (
    <>
      <h2>Bin</h2>
      {notesInBin.length === 0 ? (
        <p>No notes in bin.</p>
      ) : (
        <NoteList notesArray={notesInBin} />
      )}
    </>
  );
}

export default Bin;
