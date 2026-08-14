import { useState, useContext } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { AppContext } from "../../App";
import SingleView from "./SingleView";
import styles from "./singleViews.module.css";
import Button from "../button/Button";

function AddNote() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const {
    allNotes,
    categories,
    dispatchNotes: dispatch,
  } = useContext(AppContext);
  const navigate = useNavigate();

  function addNewNote() {
    const newId = self.crypto.randomUUID();
    const addedDate = Date.now();

    dispatch({
      type: "add_note",
      id: newId,
      title: title,
      body: body,
      categories: !category ? [] : [category],
      addedDate: addedDate,
    });

    setTitle("");
    setBody("");
    setCategory("");
    return navigate("/note/" + newId);
  }

  return (
    <SingleView title="Add note">
      <h2>Add note</h2>
      <div className={styles.note}>
        <label for="title">Title</label>
        <input
          id="title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.title}
        />
        <label for="content">Content</label>
        <textarea
          placeholder="Note"
          id="content"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          autoFocus={true}
          className={styles.body}
        ></textarea>

        <label for="category-select">Category</label>
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
