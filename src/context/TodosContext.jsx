import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import reducer from "../reducers/TodosReducer";

export const TodosContext = createContext([]);

export const TodosProvider = ({ children }) => {
  // تحميل البيانات من localStorage عند البداية
  const [todos, dispatch] = useReducer(reducer, [], () => {
    try {
      const savedTodos = localStorage.getItem("todos");
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (error) {
      console.log("لا توجد مهام محفوظة");
      return [];
    }
  });

  // حفظ البيانات في localStorage عند كل تغيير
  useEffect(() => {
    try {
      localStorage.setItem("todos", JSON.stringify(todos));
    } catch (error) {
      console.error("فشل حفظ المهام:", error);
    }
  }, [todos]);

  return (
    <TodosContext.Provider value={{ todos: todos, dispatch: dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error("useTodos must be used within a TodosProvider");
  }
  return context;
};
