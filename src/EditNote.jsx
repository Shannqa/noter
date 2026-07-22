import { useState } from "react";
import { useParams, useOutletContext } from "react-router";

function EditNote() {
  const [allNotes] = useOutletContext();
  const { id } = useParams();
  const note = allNotes.find((item) => item.id === id);
  if (!note) {
    return <h2>No note found</h2>;
  }
  return (
    <div>
      <h2>Edit note</h2>
    </div>
  );
}

export default EditNote;
