import { useState } from "react";
import { useOutletContext } from "react-router";
import "./AddNote.css";

function AddNote() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [allNotes, setAllNotes] = useOutletContext();

  function addNewNote() {
    const newId = self.crypto.randomUUID();
    setAllNotes([...allNotes, { id: newId, title: title, body: body }]);
    localStorage.setItem(
      "notes",
      JSON.stringify([...allNotes, { id: newId, title: title, body: body }]),
    );
    setTitle("");
    setBody("");
  }

  return (
    <div className="add-note">
      <h2>Add note</h2>
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
      <button onClick={(e) => addNewNote()} className="add-button">
        Submit
      </button>
    </div>
  );
}

export default AddNote;
