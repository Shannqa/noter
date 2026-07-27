import { useState } from "react";
import { useOutletContext, Link } from "react-router";
import AddCategory from "./AddCategory";
import "./Categories.css";

function Categories() {
  const { categories, setCategories } = useOutletContext();

  return (
    <div className="categories">
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
