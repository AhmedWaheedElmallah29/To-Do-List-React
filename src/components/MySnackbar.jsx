import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function MySnackbar({ open, message }) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
  };

  const action = (
    <>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={handleClose}
        message="Note archived"
        action={action}
      >
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert variant="filled" severity="success">
            {message}
          </Alert>
        </Stack>
      </Snackbar>
    </div>
  );
}
