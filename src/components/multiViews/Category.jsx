import { useContext } from "react";
import { useParams, Link } from "react-router";
import { AppContext } from "../../App";
import NoteList from "../noteList/NoteList.jsx";

function Category() {
  const { allNotes, setAllNotes, categories, setCategories } =
    useContext(AppContext);
  const { id } = useParams();
  const notesInCategory = allNotes.filter((note) =>
    note.categories.includes(id),
  );
  const category = categories.find((item) => item.id === id);
  console.log(allNotes);
  console.log(notesInCategory);

  return (
    <>
      <h2>{category.name}</h2>
      {notesInCategory.length === 0 ? (
        <p>No notes in this category.</p>
      ) : (
        <NoteList notesArray={notesInCategory} />
      )}
    </>
  );
}

export default Category;
