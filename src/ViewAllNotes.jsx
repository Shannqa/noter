import { useState } from "react";
import { Link, useOutletContext } from "react-router";
import "./ViewAllNotes.css";
import AddButton from "./AddButton";

function ViewAllNotes() {
  const { allNotes, setAllNotes } = useOutletContext();

  function clearStorage() {
    localStorage.clear();
    setAllNotes([]);
  }

  return (
    <>
      <h2>All notes</h2>
      <div className="multi-notes-view">
        {allNotes.map((item) => {
          if (item.status === "active") {
            return (
              <Link to={"note/" + item.id} key={item.id}>
                <div className="note">
                  <div>{item.title}</div>
                  <div>{item.body}</div>
                </div>
              </Link>
            );
          }
        })}
      </div>
      <button onClick={clearStorage}>Clear storage</button>
      <AddButton />
    </>
  );
}

export default ViewAllNotes;
