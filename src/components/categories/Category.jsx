import { useContext, useState } from "react";
import { useParams, Link } from "react-router";
import { AppContext } from "../../App.jsx";
import NoteList from "../noteList/NoteList.jsx";
import CategoryMenu from "./CategoryMenu.jsx";

function Category() {
  const { allNotes, setAllNotes, categories, dispatchCategories } =
    useContext(AppContext);
  const [editing, setEditing] = useState(false);
  const { id } = useParams();
  const notesInCategory = allNotes.filter((note) =>
    note.categories.includes(id),
  );
  const category = categories.find((item) => item.id === id);
  console.log(category);
  const [categoryName, setCategoryName] = useState("");

  console.log(allNotes);
  console.log(notesInCategory);

  function saveCategory() {
    dispatchCategories({
      type: "edit_category",
      id: id,
      name: categoryName,
    });
    setEditing(false);
  }

  function cancelRenaming() {
    setEditing(false);
    setCategoryName(category.name);
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
      <CategoryMenu id={id} editing={editing} setEditing={setEditing} />
    </>
  );
}

export default Category;
