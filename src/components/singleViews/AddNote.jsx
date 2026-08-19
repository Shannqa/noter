import { useState, useContext } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { AppContext } from "../../App";
import SingleView from "./SingleView";
import styles from "./singleViews.module.css";
import Button from "../button/Button";

function AddNote() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState(null);
  const { allNotes, categories, dispatchNotes } = useContext(AppContext);
  const navigate = useNavigate();

  async function addNewNote() {
    /* Fix a problem when category isn't selected, check how to skip a field */

    try {
      const response = await fetch("http://localhost:3000/note", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          body: body,
          userId: 4,
          categoryId: category,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to add note");
      }
      const note = await response.json();
      console.log(note);
      dispatchNotes({
        type: "add_note",
        id: note.id,
        title: note.title,
        body: note.body,
        userId: note.userId,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
        status: note.status,
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
    <SingleView title="Add note">
      <h2>Add note</h2>
      <div className={styles.note}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.title}
        />
        <label htmlFor="content">Content</label>
        <textarea
          placeholder="Note"
          id="content"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          autoFocus={true}
          className={styles.body}
        ></textarea>

        <label htmlFor="category-select">Category</label>
        <select
          name="category"
          id="category-select"
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
        <Button onClick={addNewNote}>Submit</Button>
      </div>
    </SingleView>
  );
}

export default AddNote;
