import { useState } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router";
import "./EditNote.css";

function EditNote() {
  const [allNotes, setAllNotes] = useOutletContext();
  const { id } = useParams();
  const note = allNotes.find((item) => item.id === id);
  const [title, setTitle] = useState(note.title || "");
  const [body, setBody] = useState(note.body || "");
  const navigate = useNavigate();

  function editNote() {
    setAllNotes(
      allNotes.map((item) => {
        if (item.id == note.id) {
          item.title = title;
          item.body = body;
        }
        return item;
      }),
    );
    localStorage.setItem(
      "notes",
      JSON.stringify(
        allNotes.map((item) => {
          if (item.id == note.id) {
            item.title = title;
            item.body = body;
          }
          return item;
        }),
      ),
    );
    return navigate("/note/" + id);
  }

  if (!note) {
    return <h2>No note found</h2>;
  }

  return (
    <div className="edit-note">
      <h2>Edit note</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="note-title"
      />
      <textarea
        placeholder="Note"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        autoFocus={true}
        className="note-body"
      ></textarea>
      <button onClick={(e) => editNote()} className="submit-button">
        Submit
      </button>
    </div>
  );
}

export default EditNote;
