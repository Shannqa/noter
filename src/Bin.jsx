import { useOutletContext, Link } from "react-router";

function Bin() {
  const { allNotes, setAllNotes, categories, setCategories } =
    useOutletContext();
  const notesInBin = allNotes.filter((note) => note.status === "bin");

  if (notesInBin.length === 0) {
    return (
      <div className="bin">
        <h2>Bin</h2>
        <p>No notes in bin.</p>
      </div>
    );
  }

  return (
    <div className="bin">
      <h2>Bin</h2>
      {notesInBin.map((item) => (
        <Link to={`/note/${item.id}`} key={item.id}>
          <div className="note">
            <div>{item.title}</div>
            <div>{item.body}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Bin;
