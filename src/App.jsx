import { useState, useEffect, createContext } from "react";
import "./App.css";
import AddNote from "./components/singleViews/AddNote";
import { Link, Outlet } from "react-router";
import Header from "./components/header/Header";
import AddButton from "./components/addButon/AddButton";

export const AppContext = createContext({
  allNotes: [],
  setAllNotes: () => {},
  categories: [],
  setCategories: () => {},
});

function App() {
  const [allNotes, setAllNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    const initialNotes = JSON.parse(savedNotes);
    return initialNotes || [];
  });
  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem("categories");
    const initialCategories = JSON.parse(savedCategories);
    return initialCategories || [];
  });
  console.log(allNotes);
  console.log(categories);
  return (
    <>
      <AppContext value={{ allNotes, setAllNotes, categories, setCategories }}>
        <Header />
        <div className="outlet-body">
          <Outlet
          // context={{ allNotes, setAllNotes, categories, setCategories }}
          />
        </div>
      </AppContext>

      {/* <AddNote allNotes={allNotes} setAllNotes={setAllNotes} /> */}
      {/* <ViewAllNotes allNotes={allNotes} /> */}
      {/* <AddButton /> */}
    </>
  );
}

export default App;
