function noteReducer(allNotes, action) {
  switch (action.type) {
    case "set_notes": {
      return action.notes;
    }
    case "add_note": {
      return [
        ...allNotes,
        {
          // categories: !action.category ? [] : [action.category],
          id: action.id,
          title: action.title,
          body: action.body,
          userId: action.userId,
          createdAt: action.createdAt,
          updatedAt: action.updatedAt,
          status: action.status,
          categories: action.categories,
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
            updatedAt: action.updatedAt,
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
            status: "BIN",
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
            status: "ACTIVE",
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
            status: "ARCHIVE",
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
            status: "ACTIVE",
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
