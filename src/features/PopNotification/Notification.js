import { Alert, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";

const Notification = ({message, severity, isError, isSuccess}) => {

  useEffect(() => {
    setOpen(true);
  }, [isError]);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
