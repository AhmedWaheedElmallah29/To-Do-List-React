import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { TodosContext } from "./context/TodosContext";

import Box from "@mui/material/Box";
import { useContext } from "react";
import { ToastContext } from "../context/ToastContext";

export default function Todo({ todo, handleOpenDelete, handleOpenEdit }) {
  const { todos, setTodos } = useContext(TodosContext);
  const { showHideToast } = useContext(ToastContext);
  function handleDone(id) {
    const currentTodo = todos.find((t) => t.id === id);
    if (currentTodo.isDone) {
      showHideToast("Task is Pending again");
    } else {
      showHideToast("Task is Done Successfully");
    }

    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isDone: !todo.isDone };
        }
        return todo;
      })
    );
  }

  return (
    <>
      <Card
        sx={{
          bgcolor: "#f8f9fa",
          borderRadius: "12px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          transition: "all 0.3s ease",
          border: "1px solid #e9ecef",
          "&:hover": {
            transform: "translateX(4px)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
            borderColor: "#667eea",
          },
        }}
      >
        <CardContent sx={{ padding: "16px !important" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography
                style={todo.isDone && { textDecoration: "line-through" }}
                variant="h6"
                sx={{
                  fontWeight: 500,
                  fontSize: "1rem",
                  color: "#212529",
                }}
              >
                {todo.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#6c757d",
                  fontSize: "0.85rem",
                  marginTop: "4px",
                }}
              >
                {todo.body}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "4px",
              }}
            >
              <IconButton
                onClick={() => {
                  handleDone(todo.id);
                }}
                size="medium"
                sx={{
                  color: todo.isDone ? "#28a745" : "#6c757d",
                  "&:hover": {
                    bgcolor: "rgba(40, 167, 69, 0.1)",
                    color: "#28a745",
                  },
                }}
              >
                <CheckCircleOutlineIcon fontSize="medium" />
              </IconButton>
              <IconButton
                onClick={() => {
                  handleOpenEdit(todo);
                }}
                size="medium"
                sx={{
                  color: "#667eea",
                  "&:hover": {
                    bgcolor: "rgba(102, 126, 234, 0.1)",
                  },
                }}
              >
                <EditIcon fontSize="medium" />
              </IconButton>
              <IconButton
                onClick={() => {
                  handleOpenDelete(todo);
                }}
                size="medium"
                sx={{
                  color: "#dc3545",
                  "&:hover": {
                    bgcolor: "rgba(220, 53, 69, 0.1)",
                  },
                }}
              >
                <DeleteOutlineIcon fontSize="medium" />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
