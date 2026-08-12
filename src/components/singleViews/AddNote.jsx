import { useState, useContext } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { AppContext } from "../../App";
import SingleView from "./SingleView";
import styles from "./singleViews.module.css";

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
      <button onClick={(e) => addNewNote()} className={styles.button}>
        Submit
      </button>
    </SingleView>
  );
}

export default AddNote;
