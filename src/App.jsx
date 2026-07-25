import { useState, useEffect } from "react";
import "./App.css";
import AddNote from "./AddNote";
import ViewAllNotes from "./ViewAllNotes";
import { Link, Outlet } from "react-router";
import MainMenu from "./MainMenu";
import AddButton from "./AddButton";

function App() {
  const [allNotes, setAllNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    const initialNotes = JSON.parse(savedNotes);
    return initialNotes || [];
  });

  return (
    <>
      <div className="header">
        <MainMenu />
        <Link to={"/"}>Home</Link>
      </div>

      <Outlet context={[allNotes, setAllNotes]} />
      {/* <AddNote allNotes={allNotes} setAllNotes={setAllNotes} /> */}
      {/* <ViewAllNotes allNotes={allNotes} /> */}
      {/* <AddButton /> */}
    </>
  );
}

export default App;
