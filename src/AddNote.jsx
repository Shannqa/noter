import { useState } from "react";
import "./AddNote.css";

function AddNote({ allNotes, setAllNotes }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  function addNewNote() {
    setAllNotes([
      ...allNotes,
      { id: self.crypto.randomUUID(), title: title, body: body },
    ]);
  }

  return (
    <div className="add-note">
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
      <button onClick={(e) => addNewNote()}>Submit</button>
    </div>
  );
}

export default AddNote;
