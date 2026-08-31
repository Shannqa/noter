import { useState } from "react";
import styles from "./login.module.css";
import Button from "../button/Button.jsx";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function sendForm(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/user/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to sign up");
      }
      const result = await response.json();
      // console.log(result);
      // setTitle("");
      // setBody("");
      // setCategory("");
      // navigate(`/note/${result.id}`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.view}>
      <form className={styles.login}>
        <h1 className={styles.formLabel}>Create account</h1>
        <label htmlFor="name">Username</label>
        <input name="name" onChange={(e) => setName(e.target.value)} />
        <span className={styles.inputError}>Error</span>
        <label htmlFor="email">Email</label>
        <input name="email" onChange={(e) => setEmail(e.target.value)} />
        <span className={styles.inputError}></span>
        <label htmlFor="password">Password</label>
        <input name="password" onChange={(e) => setPassword(e.target.value)} />
        <span className={styles.inputError}></span>
        <Button onClick={(e) => sendForm(e)} style={"primary"}>
          Sign up
        </Button>
      </form>
    </div>
  );
}

export default SignUp;
