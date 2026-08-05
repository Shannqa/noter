import { useContext } from "react";
import { Link } from "react-router";
import { AppContext } from "../../App";
import NoteList from "../noteList/NoteList";

function Bin() {
  const { allNotes, setAllNotes } = useContext(AppContext);
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
