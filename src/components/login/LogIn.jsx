import { useState } from "react";
import styles from "./login.module.css";
import { useNavigate } from "react-router";
function LogIn() {
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
      navigate("/");
      console.log("result", result);
      // setTitle("");
      // setBody("");
      // setCategory("");
      // navigate(`/note/${result.id}`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <form className={styles.login}>
        <label htmlFor="name">Username</label>
        <input name="name" onChange={(e) => setName(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={(e) => sendForm(e)}>Log in</button>
      </form>
    </div>
  );
}

export default LogIn;
