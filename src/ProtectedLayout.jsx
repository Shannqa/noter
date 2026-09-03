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
import noteReducer from "./reducers/noteReducer";
import categoryReducer from "./reducers/categoryReducer";
import { AuthContext } from "./App";
import Landing from "./pages/Landing";
export const AppContext = createContext({
  allNotes: [],
  dispatchNotes: null,
  categories: [],
  dispatchCategories: null,
  categoriesLoaded: false,
  notesLoaded: false,
  settings: {},
});

function ProtectedLayout() {
  const { user } = useContext(AuthContext);
  const [allNotes, dispatchNotes] = useReducer(noteReducer, []);
  const [categories, dispatchCategories] = useReducer(categoryReducer, []);
  const [notesLoaded, setNotesLoaded] = useState(false);
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [settings, setSettings] = useState([]);

  console.log("prot");
  useEffect(() => {
    async function loadDb() {
      try {
        const [notesRes, categoriesRes, settingsRes] = await Promise.all([
          fetch("http://localhost:3000/note", {
            credentials: "include",
          }),
          fetch("http://localhost:3000/category", {
            credentials: "include",
          }),
          fetch("http://localhost:3000/settings", {
            credentials: "include",
          }),
        ]);

        if (!notesRes.ok) {
          throw new Error("Failed to fetch notes");
        }
        if (!categoriesRes.ok) {
          throw new Error("Failed to fetch categories");
        }
        if (!settingsRes.ok) {
          throw new Error("Failed to fetch settings");
        }

        const [notesJson, categoriesJson, settingsJson] = await Promise.all([
          notesRes.json(),
          categoriesRes.json(),
          settingsRes.json(),
        ]);

        dispatchNotes({
          type: "set_notes",
          notes: notesJson,
        });

        dispatchCategories({
          type: "set_categories",
          categories: categoriesJson,
        });

        setSettings(settingsJson);

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
        settings,
      }}
    >
      <Outlet />
    </AppContext>
  );
}

export default ProtectedLayout;
