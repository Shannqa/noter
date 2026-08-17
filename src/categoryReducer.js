function checkValidity(categories, action) {
  if (categories.some((item) => item.name === action.name)) {
    return {
      valid: false,
      message: "Category with that name already exists",
    };
  }
}

function categoryReducer(categories, action) {
  switch (action.type) {
    case "set_categories": {
      return action.categories;
    }
    case "add_category": {
      return [
        ...categories,
        {
          id: action.id,
          name: action.name,
        },
      ];
    }
    case "edit_category": {
      return categories.map((item) => {
        if (item.id === action.id) {
          return {
            ...item,
            name: action.name,
          };
        }
        return item;
      });
    }
    case "delete_category": {
      return categories.filter((item) => item.id !== action.id);
    }
  }
}

export default categoryReducer;
