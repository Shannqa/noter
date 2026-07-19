import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import ViewNote from "./ViewNote.jsx";
import "./index.css";
import App from "./App.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  {
    path: "viewnote/:id",
    element: <ViewNote />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
