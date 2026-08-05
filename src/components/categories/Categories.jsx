import { useState, useContext } from "react";
import { Link } from "react-router";
import AddCategory from "./AddCategory";
import { AppContext } from "../../App";
import styles from "./categories.module.css";

function Categories() {
  const { categories, setCategories } = useContext(AppContext);

  return (
    <div className={styles.categoriesView}>
      <h2>Categories</h2>
      {categories.length == 0 ? (
        <p>No categories yet</p>
      ) : (
        <ul>
          {categories.map((item) => (
            <li key={item.id}>
              <Link to={`./${item.id}`}>{item.name}</Link>
            </li>
          ))}
        </ul>
      )}
      <AddCategory categories={categories} setCategories={setCategories} />
    </div>
  );
}

export default Categories;
