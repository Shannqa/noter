import { useOutletContext, Link } from "react-router";
import "./ViewAllNotes.css";

function Archive() {
  const { allNotes, setAllNotes } = useOutletContext();
  const notesInArchive = allNotes.filter((note) => note.status === "archive");

  if (notesInArchive.length === 0) {
    return (
      <div className="multi-notes-view">
        <h2>Archive</h2>
        <p>No notes in archive.</p>
      </div>
    );
  }

  return (
    <>
      <h2>Archive</h2>
      <div className="multi-notes-view">
        {notesInArchive.map((item) => (
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

export default Archive;
