import { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AppContext } from "../../App";
import SingleNoteMenuItems from "./SingleNoteMenuItems";
import MenuIcon from "./MenuIcon";
import styles from "./singleNoteMenu.module.css";

function SingleNoteMenu({ id, view, edit, archive, bin, setOpenDialog }) {
  const { dispatchNotes } = useContext(AppContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();

  // Click outside to close the menu
  useEffect(() => {
    const clickListener = (e) => {
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      } else {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", clickListener);
    return () => document.removeEventListener("mousedown", clickListener);
  }, [ref]);

  // Press esc to close the menu
  useEffect(() => {
    const keyListener = (e) => {
      if (menuOpen && e.keyCode == 27) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", keyListener);
    return () => document.removeEventListener("keydown", keyListener);
  }, [menuOpen]);

  function toggleMenu() {
    if (menuOpen) {
      setMenuOpen(false);
    } else {
      setMenuOpen(true);
    }
  }

  function deleteNote() {
    const date = Date.now();
    dispatchNotes({
      type: "bin_note",
      id: id,
      deletedAt: date,
    });

    return navigate("/");
  }

  function unbinNote() {
    dispatchNotes({
      type: "unbin_note",
      id: id,
    });

    return navigate("/");
  }

  function archiveNote() {
    dispatchNotes({
      type: "archive_note",
      id: id,
    });

    return navigate("/");
  }

  function unarchiveNote() {
    dispatchNotes({
      type: "unarchive_note",
      id: id,
    });

    return navigate("/");
  }

  function deleteNotePermAsk() {
    // show modal - are you sure?
    setOpenDialog();
  }

  return (
    <div className={styles.singleNoteMenu} ref={ref}>
      <MenuIcon onClick={toggleMenu} />
      {menuOpen && (
        <SingleNoteMenuItems
          menuOpen={menuOpen}
          onClick={toggleMenu}
          id={id}
          view={view}
          edit={edit}
          archive={archive}
          bin={bin}
          archiveNote={archiveNote}
          unarchiveNote={unarchiveNote}
          deleteNote={deleteNote}
          unbinNote={unbinNote}
          deleteNotePermAsk={deleteNotePermAsk}
        />
      )}
    </div>
  );
}

export default SingleNoteMenu;
