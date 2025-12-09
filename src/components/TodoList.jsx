import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ChecklistIcon from "@mui/icons-material/Checklist";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useMemo, useState } from "react";
import Todo from "./Todo";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { TodosContext } from "../context/TodosContext";

import { v4 as uuidv4 } from "uuid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContent } from "@mui/material";
import { useToast } from "../context/ToastContext";

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);
  const { showHideToast } = useToast();

  const [inp, setInp] = useState("");
  const [value, setValue] = useState(0);

  //////////////// for handleDelete////////////////////
  const [openDelete, setOpenDelete] = useState(false);
  const [dialogTodo, setDialogTodo] = useState(null);

  function handleOpenDelete(todo) {
    setDialogTodo(todo);
    setOpenDelete(true);
  }

  function handleCloseDelete() {
    setOpenDelete(false);
  }

  function handleDelete() {
    setTodos(todos.filter((todo) => dialogTodo.id !== todo.id));
    setOpenDelete(false);
    showHideToast("Deleted Successfully");
  }
  //////////////// for handleDelete////////////////////

  ////////////////// for handleEdit/////////////////////
  const [openEdit, setOpenEdit] = useState(false);
  const [updateTodo, setUpdateTodo] = useState({
    title: todos.title,
    body: todos.body,
  });

  function handleOpenEdit(todo) {
    setDialogTodo(todo);
    setUpdateTodo({ title: todo.title, body: todo.body });
    setOpenEdit(true);
  }

  function handleCloseEdit() {
    setOpenEdit(false);
  }

  function handleEdit() {
    setTodos(
      todos.map((t) =>
        t.id === dialogTodo.id
          ? { ...t, title: updateTodo.title, body: updateTodo.body }
          : t
      )
    );
    setOpenEdit(false);
    showHideToast("Edited Successfully");
  }
  ////////////////// for handleEdit/////////////////////

  function handleAdd() {
    inp &&
      setTodos([
        ...todos,
        { id: uuidv4(), title: inp, body: "", isDone: false },
      ]);
    setInp("");
    showHideToast("Added Successfully");
  }

  const todosToBeRendered = useMemo(() => {
    return todos.filter((todo) => {
      if (value === 0) return true;
      if (value === 1) return todo.isDone;
      if (value === 2) return !todo.isDone;
      return false;
    });
  }, [todos, value]);

  function getEmptyMessage() {
    if (value === 0) return "No tasks created yet";
    if (value === 1) return "No Taks Completed Yet";
    if (value === 2) return "All Taks Completed";
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
          {`Do You sure You want to delete This Todo`}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancel</Button>
          <Button onClick={handleDelete} color="error" autoFocus>
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
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          sx={{
            minHeight: "100vh",
            padding: "40px 20px",
          }}
        >
          <Card
            sx={{
              borderRadius: "16px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
              overflow: "hidden",
            }}
          >
            <CardContent
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                padding: "32px 24px !important",
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  marginBottom: "8px",
                }}
              >
                My Tasks
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  opacity: 0.9,
                  fontSize: "0.95rem",
                }}
              >
                Stay organized and productive
              </Typography>
            </CardContent>

            <Tabs
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              sx={{
                bgcolor: "#f8f9fa",
                borderBottom: "2px solid #e9ecef",
                "& .MuiTab-root": {
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  minHeight: "64px",
                },
                "& .Mui-selected": {
                  color: "#667eea !important",
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "#667eea",
                  height: "3px",
                },
              }}
              centered
            >
              <Tab icon={<ChecklistIcon />} label="ALL" />
              <Tab icon={<TaskAltIcon />} label="DONE" />
              <Tab icon={<CloseIcon />} label="NOT DONE" />
            </Tabs>

            <Box sx={{ padding: "24px", bgcolor: "white" }}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "12px" }}
              >
                {todosToBeRendered.length > 0 ? (
                  todosToBeRendered.map((todo) => (
                    <Todo
                      key={todo.id}
                      todo={todo}
                      handleOpenEdit={handleOpenEdit}
                      handleOpenDelete={handleOpenDelete}
                    />
                  ))
                ) : (
                  <Box
                    sx={{
                      textAlign: "center",
                      padding: "40px 0",
                      color: "#888",
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      {getEmptyMessage()}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
            <Grid container spacing={2} style={{ margin: "20px" }}>
              <Grid size={8}>
                <TextField
                  value={inp}
                  onChange={(e) => {
                    setInp(e.target.value);
                  }}
                  fullWidth
                  id="add-task-input"
                  label="Add new task"
                  variant="outlined"
                  placeholder="What do you need to do?"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      backgroundColor: "#f8f9fa",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#fff",
                        "& fieldset": {
                          borderColor: "#667eea",
                        },
                      },
                      "&.Mui-focused": {
                        backgroundColor: "#fff",
                        "& fieldset": {
                          borderColor: "#667eea",
                          borderWidth: "2px",
                        },
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#667eea",
                      fontWeight: 600,
                    },
                  }}
                />
              </Grid>
              <Grid size={4}>
                <Button
                  onClick={handleAdd}
                  fullWidth
                  disabled={!inp}
                  variant="contained"
                  sx={{
                    height: "56px",
                    background:
                      inp &&
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: "10px",
                    fontWeight: 700,
                    fontSize: "1rem",
                    textTransform: "none",
                    boxShadow: "0 4px 6px rgba(102, 126, 234, 0.3)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #5568d3 0%, #653a8b 100%)",
                      boxShadow: "0 6px 12px rgba(102, 126, 234, 0.4)",
                      transform: "translateY(-2px)",
                    },
                    "&:active": {
                      transform: "translateY(0)",
                    },
                  }}
                >
                  Add Task
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Container>
    </>
  );
}
