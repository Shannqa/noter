import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import ViewNote from "./ViewNote.jsx";
import EditNote from "./EditNote.jsx";
import ViewAllNotes from "./ViewAllNotes.jsx";
import "./index.css";
import App from "./App.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <ViewAllNotes />,
      },
      {
        path: "note/:id",
        element: <ViewNote />,
      },
      {
        path: "note/:id/edit",
        element: <EditNote />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
