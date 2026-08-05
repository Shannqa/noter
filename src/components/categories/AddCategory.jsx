import { useState, useContext } from "react";
import { AppContext } from "../../App";

function AddCategory() {
  const { categories, setCategories } = useContext(AppContext);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function checkValidity() {
    if (name.length == 0) {
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

  function handleSave() {
    console.log(categories.length);
    const check = checkValidity();
    if (!check.valid) {
      setError(check.message);
    } else {
      setError("");
      const newId = self.crypto.randomUUID();
      setCategories([...categories, { id: newId, name: name }]);
      localStorage.setItem(
        "categories",
        JSON.stringify([...categories, { id: newId, name: name }]),
      );
      setName("");
    }
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
