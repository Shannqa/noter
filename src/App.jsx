import { useState, useEffect } from "react";
import "./App.css";
import AddNote from "./AddNote";
import { Link, Outlet } from "react-router";
import Header from "./components/header/Header";
import AddButton from "./AddButton";

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
      <Header />
      <div className="outlet-body">
        <Outlet
          context={{ allNotes, setAllNotes, categories, setCategories }}
        />
      </div>

      {/* <AddNote allNotes={allNotes} setAllNotes={setAllNotes} /> */}
      {/* <ViewAllNotes allNotes={allNotes} /> */}
      {/* <AddButton /> */}
    </>
  );
}

export default App;
