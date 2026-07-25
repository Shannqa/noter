import { useState } from "react";
import "./App.css";
import AddNote from "./AddNote";
import ViewAllNotes from "./ViewAllNotes";
import { Link, Outlet } from "react-router";
import MainMenu from "./MainMenu";

function App() {
  const [allNotes, setAllNotes] = useState([]);

  return (
    <>
      <div className="header">
        <MainMenu />
        <Link to={"/"}>Home</Link>
      </div>

      <Outlet context={[allNotes]} />
      <AddNote allNotes={allNotes} setAllNotes={setAllNotes} />
      {/* <ViewAllNotes allNotes={allNotes} /> */}
    </>
  );
}

export default App;
