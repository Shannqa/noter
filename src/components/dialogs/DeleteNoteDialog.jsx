import { useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router";
import Dialog from "./Dialog";
import { AppContext } from "../../App";

function DeleteNoteDialog({ id, openDialog, setOpenDialog }) {
  const { dispatchNotes } = useContext(AppContext);
  const navigate = useNavigate();

  function deleteNotePerm() {
    dispatchNotes({
      type: "delete_perm",
      id: id,
    });
    return navigate("/");
  }
  return (
    <Dialog openDialog={openDialog} setOpenDialog={setOpenDialog}>
      <p>Delete the note permanently?</p>
      <p>This action cannot be reversed</p>
      <button onClick={deleteNotePerm}>Delete</button>
      <button onClick={() => setOpenDialog(false)}>Cancel</button>
    </Dialog>
  );
}

export default DeleteNoteDialog;
