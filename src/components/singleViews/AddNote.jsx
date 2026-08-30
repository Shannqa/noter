import { useState, useContext } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { AppContext } from "../../ProtectedLayout";
import styles from "./singleViews.module.css";
import Button from "../button/Button";

function AddNote() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState(null);
  const { allNotes, categories, dispatchNotes } = useContext(AppContext);
  const navigate = useNavigate();

  async function addNewNote() {
    try {
      const response = await fetch("http://localhost:3000/note", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: title,
          body: body,
          userId: 4,
          categoryId: parseInt(category),
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to add note");
      }
      const result = await response.json();
      console.log(result);
      dispatchNotes({
        type: "add_note",
        id: result.id,
        title: result.title,
        body: result.body,
        userId: result.userId,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
        status: result.status,
        category: result.category,
      });
      setTitle("");
      setBody("");
      setCategory("");
      navigate(`/note/${result.id}`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.singleView}>
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
    </div>
  );
}

export default AddNote;
