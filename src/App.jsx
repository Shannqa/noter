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
  notesLoaded: false,
});

function App() {
  const [user, setUser] = useState(null);
  const [allNotes, dispatchNotes] = useReducer(noteReducer, []);
  const [categories, dispatchCategories] = useReducer(categoryReducer, []);
  const [notesLoaded, setNotesLoaded] = useState(false);
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadDb() {
      try {
        const [userRes, notesRes, categoriesRes] = await Promise.all([
          fetch("http://localhost:3000/user/auth", {
            credentials: "include",
          }),
          fetch("http://localhost:3000/note?userId=4", {
            credentials: "include",
          }),
          fetch("http://localhost:3000/category?userId=4", {
            credentials: "include",
          }),
        ]);

        if (!userRes.ok) {
          throw new Error("Failed to authenticate user");
        } else {
          const userJson = await userRes.json();
          setUser(userJson);
        }

        if (!notesRes.ok) {
          throw new Error("Failed to fetch notes");
        } else {
          const notesJson = await notesRes.json();
          console.log(notesJson);
          dispatchNotes({
            type: "set_notes",
            notes: notesJson,
          });
          setNotesLoaded(true);
        }

        if (!categoriesRes.ok) {
          throw new Error("Failed to fetch categories");
        } else {
          const categoriesJson = await categoriesRes.json();
          dispatchCategories({
            type: "set_categories",
            categories: categoriesJson,
          });
          setCategoriesLoaded(true);
        }

        setLoaded(true);
      } catch (err) {
        console.error(err);
      }
    }
    loadDb();
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
          notesLoaded,
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
