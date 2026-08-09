import { useState, useContext } from "react";
import { useParams, Link } from "react-router";
import { AppContext } from "../../App";
import NoteMenu from "./NoteMenu";
import SingleView from "./SingleView";
import styles from "./singleViews.module.css";
import MenuIcon from "./MenuIcon";

function ViewNote() {
  const { allNotes, categories } = useContext(AppContext);
  const { id } = useParams();
  const note = allNotes.find((item) => item.id === id);

  if (!note) {
    return (
      <SingleView title="View note">
        <p>No note found.</p>
      </SingleView>
    );
  }

  // console.log(note);

  const categoriesInNote = categories.filter((cat) =>
    note.categories.includes(cat.id),
  );

  return (
    <SingleView title="View note">
      <div className={styles.note}>
        <div className={styles.title}>{note.title}</div>
        <div className={styles.body}>{note.body}</div>
      </div>
      <ul className={styles.categories}>
        {categoriesInNote.map((item) => (
          <li key={item.id}>
            <Link to={`/categories/${item.id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
      <div className={styles.dateList}>
        <p>Created at: {new Date(note.createdAt).toLocaleString("pl-PL")}</p>
        <p>
          Last edited at: {new Date(note.lastEditedAt).toLocaleString("pl-PL")}
        </p>
      </div>
      <MenuIcon />
      <NoteMenu
        id={id}
        edit={true}
        bin={note.status == "bin" ? false : true}
        archive={note.status == "archive" ? false : true}
      />
    </SingleView>
  );
}

export default ViewNote;
