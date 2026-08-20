import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { AppContext } from "../../App";
import SingleNoteMenu from "../singleNoteMenu/SingleNoteMenu";
import styles from "./singleViews.module.css";

function EditNote(note) {
  const { allNotes, categories, dispatchNotes } = useContext(AppContext);
  const { id } = useParams();
  const [title, setTitle] = useState(note.title || null);
  const [body, setBody] = useState(note.body || "");
  const [category, setCategory] = useState(note.category || null);
  const navigate = useNavigate();

  async function editNote() {
    try {
      const response = await fetch(`http://localhost:3000/note/${id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          body: body,
          category: category,
          userId: 4,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to edit note");
      }
      const note = await response.json();
      console.log(note);
      dispatchNotes({
        type: "edit_note",
        title: note.title,
        body: note.body,
        updatedAt: note.updatedAt,
        category: note.category,
      });
      setTitle("");
      setBody("");
      setCategory("");
      navigate(`/note/${note.id}`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.singleView}>
      <div className={styles.viewHeading}>
        <h2>Edit Note</h2>
        <SingleNoteMenu
          id={id}
          view={true}
          bin={note.status == "bin" ? false : true}
          archive={note.status == "archive" ? false : true}
          setOpenDialog={() => setOpenDialog(true)}
        />
      </div>

      <div className={styles.note}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.title}
        />
        <textarea
          placeholder="Note"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          autoFocus={true}
          className={styles.body}
        ></textarea>
      </div>
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
      <button onClick={(e) => editNote()} className={styles.button}>
        Submit
      </button>
    </div>
  );
}

export default EditNote;
