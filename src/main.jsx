import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import ViewNote from "./ViewNote.jsx";
import EditNote from "./EditNote.jsx";
import ViewAllNotes from "./ViewAllNotes.jsx";
import AddNote from "./AddNote.jsx";
// import "./index.css";
import App from "./App.jsx";
import Archive from "./Archive.jsx";
import Bin from "./Bin.jsx";
import Categories from "./Categories.jsx";
import Settings from "./Settings.jsx";

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
      {
        path: "note/add",
        element: <AddNote />,
      },
      {
        path: "archive",
        element: <Archive />,
      },
      {
        path: "bin",
        element: <Bin />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
