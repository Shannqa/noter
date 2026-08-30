import { useState, useContext } from "react";
import styles from "./login.module.css";
import { useNavigate } from "react-router";
import { AuthContext } from "../../App.jsx";
import Button from "../button/Button.jsx";

function LogIn() {
  const { setUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function sendForm(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: name,
          password: password,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to log in");
      }
      const result = await response.json();
      // console.log("result", result);
      setUser(result.user);
      setName("");
      setPassword("");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.view}>
      <form className={styles.login}>
        <h1 className={styles.formLabel}>Welcome back!</h1>
        <label htmlFor="name">Username</label>
        <input name="name" onChange={(e) => setName(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={(e) => sendForm(e)}>Log in</Button>
      </form>
    </div>
  );
}

export default LogIn;
