import { useState, useEffect, createContext, useReducer } from "react";
import styles from "./app.module.css";
import AddNote from "./components/singleViews/AddNote";
import { Link, Outlet } from "react-router";
import Header from "./components/header/Header";
import AddButton from "./components/addButon/AddButton";
import noteReducer from "./noteReducer";

export const AppContext = createContext({
  allNotes: [],
  setAllNotes: () => {},
  dispatch: null,
  categories: [],
  setCategories: () => {},
});

function App() {
  const [allNotes, dispatch] = useReducer(noteReducer, null, () => {
    const savedNotes = localStorage.getItem("notes");
    const initialNotes = JSON.parse(savedNotes);
    return initialNotes || [];
  });
  // const [allNotes, setAllNotes] = useState(() => {
  //   const savedNotes = localStorage.getItem("notes");
  //   const initialNotes = JSON.parse(savedNotes);
  //   return initialNotes || [];
  // });
  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem("categories");
    const initialCategories = JSON.parse(savedCategories);
    return initialCategories || [];
  });
  // console.log(allNotes);
  // console.log(categories);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(allNotes));
  });

  return (
    <>
      <AppContext
        value={{
          allNotes,
          setAllNotes: () => {
            console.log("set");
          },
          categories,
          setCategories,
          dispatch,
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
