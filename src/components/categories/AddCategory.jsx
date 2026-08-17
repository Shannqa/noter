import { useState, useContext } from "react";
import { AppContext } from "../../App";

function AddCategory() {
  const { categories, setCategories, dispatchCategories } =
    useContext(AppContext);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function checkValidity() {
    if (name.trim().length == 0) {
      return { valid: false, message: "Category name must not be empty" };
    } else if (categories.length > 0) {
      if (categories.some((item) => item.name === name)) {
        return {
          valid: false,
          message: "Category with that name already exists",
        };
      } else {
        return { valid: true };
      }
    } else {
      return { valid: true };
    }
  }

  async function handleSave() {
    try {
      const response = await fetch("http://localhost:3000/category", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          userId: 4,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to add category");
      }
      const category = await response.json();
      // console.log(category);
      dispatchCategories({
        type: "add_category",
        id: category.id,
        name: category.name,
      });
      setName("");
    } catch (err) {
      console.log(err);
    }

    // console.log(categories.length);
    // const check = checkValidity();
    // if (!check.valid) {
    //   setError(check.message);
    // } else {
    //   setError("");
    //   const newId = self.crypto.randomUUID();
    //   dispatchCategories({
    //     type: "add_category",
    //     id: newId,
    //     name: name,
    //   });
    //   setName("");
    // }
  }

  function handleCancel() {
    setName("");
    setError("");
  }

  return (
    <div className="add-category">
      <h3>Add category</h3>
      <label htmlFor="name">Category name</label>
      <input
        type="text"
        id="name"
        placeholder="Enter name"
        onChange={(e) => {
          setError("");
          setName(e.target.value);
        }}
        value={name}
        className={error ? "invalid" : "valid"}
      />
      <span className="input-error">{error}</span>
      <div>
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default AddCategory;
