function noteReducer(allNotes, action) {
  switch (action.type) {
    case "add_note": {
      return [
        ...allNotes,
        {
          id: action.id,
          title: action.title,
          body: action.body,
          categories: !action.category ? [] : [action.category],
          status: "active",
          createdAt: action.addedDate,
          lastEditedAt: action.addedDate,
          deletedAt: null,
        },
      ];
    }
    case "edit_note": {
      return allNotes.map((item) => {
        if (item.id === action.id) {
          return {
            ...item,
            title: action.title,
            body: action.body,
            categories: action.categories,
            lastEditedAt: action.date,
          };
        }
        return item;
      });
    }
    case "bin_note": {
      return allNotes.map((item) => {
        if (item.id === action.id) {
          return {
            ...item,
            status: "bin",
            deletedAt: action.deletedDate,
          };
        }
        return item;
      });
    }
    case "unbin_note": {
      return allNotes.map((item) => {
        if (item.id === action.id) {
          return {
            ...item,
            status: "active",
            deletedAt: null,
          };
        }
        return item;
      });
    }
    case "delete_perm": {
      return allNotes.filter((item) => item.id !== action.id);
    }
    case "archive_note": {
      return allNotes.map((item) => {
        if (item.id === action.id) {
          return {
            ...item,
            status: "archive",
            lastEditedAt: action.lastEditedAt,
          };
        }
        return item;
      });
    }
    case "unarchive_note": {
      return allNotes.map((item) => {
        if (item.id === action.id) {
          return {
            ...item,
            status: "active",
            lastEditedAt: action.lastEditedAt,
          };
        }
        return item;
      });
    }
    case "delete_category_in_notes": {
      return allNotes.map((item) => {
        if (item.categories.includes(action.id)) {
          return {
            ...item,
            categories: item.categories.filter((id) => id !== action.id),
          };
        }
        return item;
      });
    }
  }
  throw Error("Unknown action: " + action.type);
}

export default noteReducer;
