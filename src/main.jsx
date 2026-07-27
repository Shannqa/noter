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
import Categories from "./components/categories/Categories.jsx";
import Settings from "./Settings.jsx";
import Category from "./components/categories/Category.jsx";

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
        path: "categories/:id",
        element: <Category />,
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
