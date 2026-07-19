import { useState } from "react";
import { Link } from "react-router";
import "./ViewAllNotes.css";

function ViewAllNotes({ allNotes }) {
  return (
    <div className="view-all-notes">
      {allNotes.map((item) => (
        <Link to={"viewnote/" + item.id} key={item.id}>
          <div className="note">
            <div>{item.title}</div>
            <div>{item.body}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ViewAllNotes;
