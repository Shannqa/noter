import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AppContext } from "../../App";
import styles from "./noteMenu.module.css";

function CategoryMenu({ id, editing, setEditing }) {
  const { allNotes, dispatchNotes, categories, dispatchCategories } =
    useContext(AppContext);
  const navigate = useNavigate();

  function renameCategory() {
    setEditing(true);
  }

  function deleteCategory() {
    dispatchCategories({
      type: "delete_category",
      id: id,
    });
    dispatchNotes({
      type: "delete_category_in_notes",
      id: id,
    });
  }

  return (
    <div className={styles.menu}>
      <button className={styles.item} onClick={renameCategory}>
        Rename category
      </button>
      <button className={styles.item} onClick={deleteCategory}>
        Delete category
      </button>
    </div>
  );
}

export default CategoryMenu;
