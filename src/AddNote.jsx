import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router";
import "./AddNote.css";

function AddNote() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const { allNotes, setAllNotes, categories } = useOutletContext();
  const navigate = useNavigate();

  function addNewNote() {
    const newId = self.crypto.randomUUID();
    setAllNotes([
      ...allNotes,
      {
        id: newId,
        title: title,
        body: body,
        categories: !category ? [] : [category],
        status: "active",
      },
    ]);
    localStorage.setItem(
      "notes",
      JSON.stringify([
        ...allNotes,
        {
          id: newId,
          title: title,
          body: body,
          categories: !category ? [] : [category],
          status: "active",
        },
      ]),
    );
    setTitle("");
    setBody("");
    setCategory("");
    return navigate("/note/" + newId);
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
      <select
        name="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select category</option>
        {categories.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <button onClick={(e) => addNewNote()} className="add-button">
        Submit
      </button>
    </div>
  );
}

export default AddNote;
