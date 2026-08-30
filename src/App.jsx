import { useState, useEffect, createContext, useReducer } from "react";
import styles from "./app.module.css";
import globalStyles from "./globalStyles.module.css";
import AddNote from "./components/singleViews/AddNote";
import { Link, Outlet } from "react-router";
import Header from "./components/header/Header";
import AddButton from "./components/addButon/AddButton";
import noteReducer from "./noteReducer";
import categoryReducer from "./categoryReducer";

export const AuthContext = createContext({
  user: null,
  setUser: () => {},
});

function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch("http://localhost:3000/user/auth", {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to authenticate user");
        }
        const result = await response.json();
        // console.log("result log ", result);
        setUser(result);
      } catch (err) {
        setUser(null);
        console.error(err);
      } finally {
        setAuthLoading(false);
      }
    }
    checkAuth();
  }, []);

  if (authLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.page}>
      <AuthContext
        value={{
          user,
          setUser,
        }}
      >
        <Header />
        <div className={styles.outletBody}>
          <Outlet />
        </div>
      </AuthContext>
    </div>
  );
}

export default App;
