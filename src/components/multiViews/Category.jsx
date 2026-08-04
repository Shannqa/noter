import { useParams, useOutletContext, Link } from "react-router";
import NoteList from "../noteList/NoteList.jsx";

function Category() {
  const { allNotes, setAllNotes, categories, setCategories } =
    useOutletContext();
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
