import { useState } from "react";
import { useParams, useOutletContext, Link } from "react-router";

function Category() {
  const { allNotes, setAllNotes, categories, setCategories } =
    useOutletContext();
  const { id } = useParams();
  const notesInCategory = allNotes.filter((note) =>
    note.categories.includes(id),
  );

  if (notesInCategory.length === 0) {
    return (
      <div className="category-view">
        <h2>Category</h2>
        <p>No notes in this category.</p>
      </div>
    );
  }

  return (
    <div className="category-view">
      <h2>Category</h2>
      {notesInCategory.map((item) => (
        <Link to={`/note/${item.id}`} key={item.id}>
          <div className="note">
            <div>{item.title}</div>
            <div>{item.body}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Category;
