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
  categoriesLoaded: false,
  notesLoaded: false
});

function App() {
  const [allNotes, dispatchNotes] = useReducer(noteReducer, []);
  const [categories, dispatchCategories] = useReducer(categoryReducer, []);
  const [notesLoaded, setNotesLoaded] = useState(false);
  const [categoriesLoaded, setCategoriesLoaded] = useState(false)
    
  // fetch categories
  useEffect(() => {
    fetch("http://localhost:3000/category?userId=4")
      .then((res) => res.json())
      .then((body) => {
        console.log("categories fetched ", body);
        dispatchCategories({
          type: "set_categories",
          categories: body,
        });
        setCategoriesLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // fetch notes
  useEffect(() => {
    fetch("http://localhost:3000/note?userId=4")
      .then((res) => res.json())
      .then((body) => {
        console.log("notes fetched ", body);
        dispatchNotes({
          type: "set_notes",
          notes: body,
        });
        setNotesLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.page}>
      <AppContext
        value={{
          allNotes,
          categories,
          dispatchNotes,
          dispatchCategories,
          categoriesLoaded,
          notesLoaded
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
