import { useState } from "react";
import { Link, useOutletContext } from "react-router";
import "./ViewAllNotes.css";

function ViewAllNotes() {
  const [allNotes] = useOutletContext();
  return (
    <>
      <h2>All notes</h2>
      <div className="view-all-notes">
        {allNotes.map((item) => (
          <Link to={"note/" + item.id} key={item.id}>
            <div className="note">
              <div>{item.title}</div>
              <div>{item.body}</div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default ViewAllNotes;
