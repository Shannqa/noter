import { useEffect, useRef } from "react";

function Dialog({ openDialog, setOpenDialog, children }) {
  const ref = useRef();

  useEffect(() => {
    if (openDialog) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openDialog]);

  return (
    <dialog ref={ref} onCancel={setOpenDialog}>
      {children}
    </dialog>
  );
}

export default Dialog;
