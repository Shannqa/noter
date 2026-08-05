import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { AppContext } from "../../App";
import "./EditNote.css";
import NoteMenu from "./NoteMenu";

function EditNote() {
  const { allNotes, setAllNotes, categories } = useContext(AppContext);
  const { id } = useParams();
  const note = allNotes.find((item) => item.id === id);
  const [title, setTitle] = useState(note.title || "");
  const [body, setBody] = useState(note.body || "");
  const [category, setCategory] = useState(note.categories[0] || "");
  const navigate = useNavigate();

  console.log(note);
  function editNote() {
    const editedDate = Date.now();
    setAllNotes(
      allNotes.map((item) => {
        if (item.id == note.id) {
          item.title = title;
          item.body = body;
          item.lastEditedAt = editedDate;
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
            item.lastEditedAt = editedDate;
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
    <>
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
        <button onClick={(e) => editNote()} className="submit-button">
          Submit
        </button>
      </div>
      <NoteMenu id={id} view={true} bin={true} />
    </>
  );
}

export default EditNote;
