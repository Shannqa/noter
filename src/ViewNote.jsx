import { useState } from "react";
import { useParams } from "react-router";

function Note({ title, body }) {
  const { id } = useParams();
  return (
    <div>
      <div id="title">{title}</div>
      <div id="body">{body}</div>
    </div>
  );
}

export default Note;
