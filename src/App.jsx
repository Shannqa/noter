import { useState } from "react";
import "./App.css";
import AddNote from "./AddNote";
import ViewAllNotes from "./ViewAllNotes";

function App() {
  const [allNotes, setAllNotes] = useState([]);

  return (
    <>
      <div>Hello world</div>
      <AddNote allNotes={allNotes} setAllNotes={setAllNotes} />
      <ViewAllNotes allNotes={allNotes} />
    </>
  );
}

export default App;
