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
  const [categories, dispatchCategories] = useReducer(
    categoryReducer,
    null,
    () => {
      const savedCategories = localStorage.getItem("categories");
      const initialCategories = JSON.parse(savedCategories);
      return initialCategories || [];
    },
  );

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(allNotes));
  }, [allNotes]);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  return (
    <>
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
    </>
  );
}

export default App;
