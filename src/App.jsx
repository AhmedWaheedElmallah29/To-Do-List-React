import { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import { TodosContext } from "./context/todosContext";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "centers",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <TodosContext.Provider value={{ todos, setTodos }}>
        <TodoList />
      </TodosContext.Provider>
    </div>
  );
}

export default App;
