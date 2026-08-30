import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "./App";

function PublicLayout({ children }) {
  const { user } = useContext(AuthContext);
  console.log(user);
  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PublicLayout;
