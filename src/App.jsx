import { useState, useEffect, createContext, useReducer } from "react";
import styles from "./app.module.css";
import globalStyles from "./globalStyles.module.css";
import AddNote from "./components/singleViews/AddNote";
import { Link, Outlet } from "react-router";
import Header from "./components/header/Header";
import AddButton from "./components/addButon/AddButton";
import noteReducer from "./noteReducer";
import categoryReducer from "./categoryReducer";

export const AppContext = createContext({
  user: null,
  setUser: () => {},
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
    async function checkAuth() {
      try {
        const response = await fetch("http://localhost:3000/user/auth", {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to authenticate user");
        }
        const result = await response.json();
        // console.log("result log ", result);
        setUser(result);
      } catch (err) {
        console.error(err);
      }
    }
    checkAuth();
  }, []);

  useEffect(() => {
    if (!user) {
      dispatchNotes({ type: "reset" });
      dispatchCategories({ type: "reset" });
      return;
    }
    async function loadDb() {
      try {
        const [notesRes, categoriesRes] = await Promise.all([
          fetch("http://localhost:3000/note", {
            credentials: "include",
          }),
          fetch("http://localhost:3000/category", {
            credentials: "include",
          }),
        ]);

        if (!notesRes.ok) {
          throw new Error("Failed to fetch notes");
        }
        if (!categoriesRes.ok) {
          throw new Error("Failed to fetch categories");
        }

        const [notesJson, categoriesJson] = await Promise.all([
          notesRes.json(),
          categoriesRes.json(),
        ]);

        dispatchNotes({
          type: "set_notes",
          notes: notesJson,
        });

        dispatchCategories({
          type: "set_categories",
          categories: categoriesJson,
        });

        setLoaded(true);
      } catch (err) {
        console.error(err);
      }
    }
    loadDb();
  }, [user]);

  return (
    <div className={styles.page}>
      <AppContext
        value={{
          user,
          setUser,
          allNotes,
          categories,
          dispatchNotes,
          dispatchCategories,
          categoriesLoaded,
          notesLoaded,
          loaded,
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
