import { useContext, useState } from "react";
import { useParams, Link } from "react-router";
import { AppContext } from "../../App.jsx";
import NoteList from "../noteList/NoteList.jsx";
import CategoryMenu from "./CategoryMenu.jsx";

function CategoryContent({ category }) {
  const { allNotes, setAllNotes, categories, dispatchCategories } =
    useContext(AppContext);

  const [editing, setEditing] = useState(false);
  const notesInCategory = allNotes.filter(
    (note) => note.category && note.category.id == category.id,
  );
  const [categoryName, setCategoryName] = useState(category.name || "");
  const [error, setError] = useState("");

  // function checkValidity() {
  //   if (categoryName.trim().length === 0) {
  //     return { valid: false, message: "Category name must not be empty" };
  //   }
  //   return { valid: true };
  // }

  async function saveCategory() {
    // const check = checkValidity();
    // if (!check.valid) {
    //   setError(check.message);
    // } else {
    //   setError("");
    //   dispatchCategories({
    //     type: "edit_category",
    //     id: id,
    //     name: categoryName,
    //   });
    // }
    // setEditing(false);

    try {
      const response = await fetch(
        `http://localhost:3000/category/${category.id}`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            id: category.id,
            name: categoryName,
            userId: 4,
          }),
        },
      );
      if (!response.ok) {
        throw new Error("Failed to edit category");
      }
      const result = await response.json();
      // console.log(category);
      dispatchCategories({
        type: "edit_category",
        id: result.id,
        name: result.name,
        userId: result.userId,
      });
      setCategoryName(result.name);
      setEditing(false);
    } catch (err) {
      console.log(err);
    }
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
