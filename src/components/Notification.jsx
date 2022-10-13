import React, { forwardRef } from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notification = ({ severity, message, isOpen, onClose }) => {
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      key={new Date().getTime()}
    >
      <Alert
        sx={{ width: "100%" }}
        variant="filled"
        elevation={6}
        onClose={onClose}
        severity={severity}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
