function categoryReducer(categories, action) {
  switch (action.type) {
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
