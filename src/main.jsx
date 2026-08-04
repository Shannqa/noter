import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import ViewNote from "./ViewNote.jsx";
import EditNote from "./EditNote.jsx";
import AddNote from "./AddNote.jsx";
import App from "./App.jsx";
import ViewAllNotes from "./components/multiViews/ViewAllNotes.jsx";
import Archive from "./components/multiViews/Archive.jsx";
import Bin from "./components/multiViews/Bin.jsx";
import Category from "./components/multiViews/Category.jsx";
import Categories from "./components/categories/Categories.jsx";
import Settings from "./components/settings/Settings.jsx";

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
