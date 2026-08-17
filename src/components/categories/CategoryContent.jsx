import { useContext, useState } from "react";
import { useParams, Link } from "react-router";
import { AppContext } from "../../App.jsx";
import NoteList from "../noteList/NoteList.jsx";
import CategoryMenu from "./CategoryMenu.jsx";

function CategoryContent({ category }) {
  const { allNotes, setAllNotes, categories, dispatchCategories } =
    useContext(AppContext);

  const [editing, setEditing] = useState(false);
  const notesInCategory = allNotes.filter((note) =>
    note.categories.includes(category.id),
  );
  const [categoryName, setCategoryName] = useState(category.name || "");
  const [error, setError] = useState("");

  function checkValidity() {
    if (categoryName.trim().length === 0) {
      return { valid: false, message: "Category name must not be empty" };
    }
    return { valid: true };
  }

  function saveCategory() {
    const check = checkValidity();
    if (!check.valid) {
      setError(check.message);
    } else {
      setError("");
      dispatchCategories({
        type: "edit_category",
        id: id,
        name: categoryName,
      });
    }
    setEditing(false);
  }

  function cancelRenaming() {
    setEditing(false);
    setCategoryName(category.name);
    setError("");
  }

  return (
    <>
      <h2>
        {editing ? (
          <>
            <input
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <button onClick={saveCategory}>Save</button>
            <button onClick={cancelRenaming}>Cancel</button>
          </>
        ) : (
          <span>{category.name}</span>
        )}
      </h2>

      {notesInCategory.length === 0 ? (
        <p>No notes in this category.</p>
      ) : (
        <NoteList notesArray={notesInCategory} />
      )}
      <CategoryMenu
        id={category.id}
        editing={editing}
        setEditing={setEditing}
      />
    </>
  );
}

export default CategoryContent;
