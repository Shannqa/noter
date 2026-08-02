import { useOutletContext, Link } from "react-router";
import "./ViewAllNotes.css";

function Bin() {
  const { allNotes, setAllNotes } = useOutletContext();
  const notesInBin = allNotes.filter((note) => note.status === "bin");

  if (notesInBin.length === 0) {
    return (
      <div className="multi-notes-view">
        <h2>Bin</h2>
        <p>No notes in bin.</p>
      </div>
    );
  }

  return (
    <>
      <h2>Bin</h2>
      <div className="multi-notes-view">
        {notesInBin.map((item) => (
          <Link to={`/note/${item.id}`} key={item.id}>
            <div className="note">
              <div>{item.title}</div>
              <div>{item.body}</div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Bin;
