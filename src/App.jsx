import { useState } from "react";
import "./App.css";
import AddNote from "./AddNote";
import ViewAllNotes from "./ViewAllNotes";
import { Link, Outlet } from "react-router";

function App() {
  const [allNotes, setAllNotes] = useState([]);

  return (
    <>
      <Link to={"/"}>Home</Link>
      <Outlet context={[allNotes]} />
      <AddNote allNotes={allNotes} setAllNotes={setAllNotes} />
      {/* <ViewAllNotes allNotes={allNotes} /> */}
    </>
  );
}

export default App;
