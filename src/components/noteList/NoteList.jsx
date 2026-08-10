import { Link } from "react-router";
import styles from "./noteList.module.css";

function NoteList({ notesArray, status, category }) {
  return (
    <div className={styles.multiNotes}>
      {notesArray.map((item) => {
        return (
          <Link to={"/note/" + item.id} key={item.id}>
            <div className={styles.note}>
              <div className={styles.title}>{item.title}</div>
              <div>{item.body}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default NoteList;
