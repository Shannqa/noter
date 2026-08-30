import {
  useState,
  useEffect,
  createContext,
  useReducer,
  useContext,
} from "react";
import styles from "./app.module.css";
import globalStyles from "./globalStyles.module.css";
import AddNote from "./components/singleViews/AddNote";
import { Link, Navigate, Outlet } from "react-router";
import Header from "./components/header/Header";
import AddButton from "./components/addButon/AddButton";
import noteReducer from "./noteReducer";
import categoryReducer from "./categoryReducer";
import { AuthContext } from "./App";
import Landing from "./pages/Landing";
export const AppContext = createContext({
  allNotes: [],
  dispatchNotes: null,
  categories: [],
  dispatchCategories: null,
  categoriesLoaded: false,
  notesLoaded: false,
});

function ProtectedLayout() {
  const { user } = useContext(AuthContext);
  const [allNotes, dispatchNotes] = useReducer(noteReducer, []);
  const [categories, dispatchCategories] = useReducer(categoryReducer, []);
  const [notesLoaded, setNotesLoaded] = useState(false);
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);
  const [loaded, setLoaded] = useState(false);

  console.log("prot");
  useEffect(() => {
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

  if (!user) {
    return <Landing />;
  }

  return (
    <AppContext
      value={{
        allNotes,
        categories,
        dispatchNotes,
        dispatchCategories,
        categoriesLoaded,
        notesLoaded,
        loaded,
      }}
    >
      <Outlet />
    </AppContext>
  );
}

export default ProtectedLayout;
