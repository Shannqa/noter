import { useContext, useState } from "react";
import { useParams, Link } from "react-router";
import { AppContext } from "../../App.jsx";
import NoteList from "../noteList/NoteList.jsx";
import CategoryMenu from "./CategoryMenu.jsx";
import CategoryContent from "./CategoryContent.jsx";

function Category() {
  const { allNotes, setAllNotes, categories, dispatchCategories } =
    useContext(AppContext);

  const { id } = useParams();
  const category = categories.find((item) => item.id === parseInt(id));
  // console.log(allNotes);
  // console.log(notesInCategory);

  if (!category) {
    return <p>Loading...</p>;
  }
  return <CategoryContent category={category} />;
}

export default Category;
