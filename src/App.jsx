import { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import MySnackbar from "./components/MySnackbar";
import { TodosContext, TodosProvider } from "./context/TodosContext";
import { ToastProvider } from "./context/ToastContext";
function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodosProvider>
      <ToastProvider>
        <div
          style={{
            display: "flex",
            justifyContent: "centers",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <TodoList />
        </div>
      </ToastProvider>
    </TodosProvider>
  );
}

export default App;
