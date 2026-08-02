import { useState } from "react";
import { useParams, useOutletContext, Link } from "react-router";
import NoteMenu from "./NoteMenu";
import "./ViewNote.css";

function Note() {
  const { allNotes, categories } = useOutletContext();
  const { id } = useParams();
  const note = allNotes.find((item) => item.id === id);

  if (!note) {
    return <h2>No note found</h2>;
  }

  console.log(note);

  const categoriesInNote = categories.filter((cat) =>
    note.categories.includes(cat.id),
  );

  console.log(categoriesInNote);

  return (
    <>
      <h2>View note</h2>
      <div className="view-note">
        <div className="note-title">{note.title}</div>
        <div className="note-body">{note.body}</div>
      </div>
      <ul>
        {categoriesInNote.map((item) => (
          <li key={item.id}>
            <Link to={`/categories/${item.id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
      <NoteMenu
        id={id}
        edit={true}
        bin={note.status == "bin" ? false : true}
        archive={note.status == "archive" ? false : true}
      />
    </>
  );
}

export default Note;
