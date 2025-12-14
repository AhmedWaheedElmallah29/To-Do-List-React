import { v4 as uuidv4 } from "uuid";

export default function reducer(state, action) {
  switch (action.type) {
    case "added":
      return [
        ...state,
        { id: uuidv4(), title: action.payload.title, body: "", isDone: false },
      ];

    default:
      throw new Error("Unknown Action" + action.type);
  }
}
