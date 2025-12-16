import { v4 as uuidv4 } from "uuid";

export default function reducer(state, action) {
  switch (action.type) {
    case "added":
      return [
        ...state,
        { id: uuidv4(), title: action.payload.title, body: "", isDone: false },
      ];
    case "delete":
      return state.filter((todo) => action.payload.id !== todo.id);
    case "update":
      return state.map((t) =>
        t.id === action.payload.id
          ? { ...t, title: action.payload.title, body: action.payload.body }
          : t
      );
    case "done":
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, isDone: !todo.isDone };
        }
        return todo;
      });
    default:
      throw new Error("Unknown Action" + action.type);
  }
}
