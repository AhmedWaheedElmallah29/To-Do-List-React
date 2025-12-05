import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { TodosContext } from "../context/todosContext";
import Box from "@mui/material/Box";
import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContent, TextField } from "@mui/material";

export default function Todo({ todo }) {
  const { todos, setTodos } = useContext(TodosContext);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [updateTodo, setUpdateTodo] = useState({
    title: todo.title,
    body: todo.body,
  });

  function handleDone(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  }

  function handleOpenDelete() {
    setOpenDelete(true);
  }

  function handleCloseDelete() {
    setOpenDelete(false);
  }

  function handleDelete(id) {
    setTodos(todos.filter((todo) => id !== todo.id));
    setOpenDelete(false);
  }

  function handleOpenEdit() {
    setUpdateTodo({ title: todo.title, body: todo.body });
    setOpenEdit(true);
  }

  function handleCloseEdit() {
    setOpenEdit(false);
  }

  function handleEdit() {
    setTodos(
      todos.map((t) =>
        t.id === todo.id
          ? { ...t, title: updateTodo.title, body: updateTodo.body }
          : t
      )
    );
    setOpenEdit(false);
  }

  return (
    <>
      {/* Delete */}
      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="responsive-dialog-title"
        disableRestoreFocus
        disableEnforceFocus
      >
        <DialogTitle id="responsive-dialog-title">
          {`Do You sure You want to delete "${todo.title}"`}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancel</Button>
          <Button
            onClick={() => {
              handleDelete(todo.id);
            }}
            color="error"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* Delete */}

      {/* Edit */}
      <Dialog
        disableEnforceFocus
        disableRestoreFocus
        fullWidth
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit The Task</DialogTitle>
        <DialogContent>
          <TextField
            value={updateTodo.title}
            margin="dense"
            label="Title"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setUpdateTodo({ ...updateTodo, title: e.target.value });
            }}
          />
          <TextField
            value={updateTodo.body}
            margin="dense"
            label="Details"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setUpdateTodo({ ...updateTodo, body: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button onClick={handleEdit} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit */}
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
                onClick={handleOpenEdit}
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
                  handleOpenDelete();
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
