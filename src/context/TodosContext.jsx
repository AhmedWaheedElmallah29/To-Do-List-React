import { createContext, useContext, useReducer } from "react";
import reducer from "../reducers/TodosReducer";

export const TodosContext = createContext([]);
export const TodosProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(reducer, []);
  return (
    <TodosContext.Provider value={{ todos: todos, dispatch: dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};
export const useTodos = () => {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
