import { useState, useEffect, createContext, useReducer } from "react";
import styles from "./app.module.css";
import AddNote from "./components/singleViews/AddNote";
import { Link, Outlet } from "react-router";
import Header from "./components/header/Header";
import AddButton from "./components/addButon/AddButton";
import noteReducer from "./noteReducer";
import categoryReducer from "./categoryReducer";

export const AppContext = createContext({
  allNotes: [],
  dispatchNotes: null,
  categories: [],
  dispatchCategories: null,
});

function App() {
  const [allNotes, dispatchNotes] = useReducer(noteReducer, null, () => {
    const savedNotes = localStorage.getItem("notes");
    const initialNotes = JSON.parse(savedNotes);
    return initialNotes || [];
  });
  const [categories, dispatchCategories] = useReducer(categoryReducer, []);

  useEffect(() => {
    fetch("http://localhost:3000/category?userId=4")
      .then((res) => res.json())
      .then((body) => {
        console.log("cat ", body);
        dispatchCategories({
          type: "set_categories",
          categories: body,
        });
        // if (body.success) {
        //   const noteId = body.id;
        //   navigate(`/notes/${noteId}`);
        // } else {
        //   // there are errors
        //   console.log(body);
      })
      .catch((err) => {
        console.log(err);
      });
    // localStorage.setItem("categories", JSON.stringify(categories));
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("notes", JSON.stringify(allNotes));
  // }, [allNotes]);

  // useEffect(() => {
  //   localStorage.setItem("categories", JSON.stringify(categories));
  // }, [categories]);

  return (
    <div className={styles.page}>
      <AppContext
        value={{
          allNotes,
          categories,
          dispatchNotes,
          dispatchCategories,
        }}
      >
        <Header />
        <div className={styles.outletBody}>
          <Outlet />
        </div>
      </AppContext>
    </div>
  );
}

export default App;
