import { use, useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import { TodosContext } from "./context/todosContext";
import MySnackbar from "./components/MySnackbar";
import { ToastContext } from "./context/ToastContext";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  function showHideToast(message) {
    setOpen(true);
    setMessage(message);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <ToastContext.Provider value={{ showHideToast }}>
      <div
        style={{
          display: "flex",
          justifyContent: "centers",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <MySnackbar open={open} message={message} />
        <TodosContext.Provider value={{ todos, setTodos }}>
          <TodoList />
        </TodosContext.Provider>
      </div>
    </ToastContext.Provider>
  );
}

export default App;
