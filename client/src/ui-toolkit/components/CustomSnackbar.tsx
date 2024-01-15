import React from "react";
import { Snackbar, Alert } from "@mui/material";

type CustomSnackbarProps = {
  open: boolean;
  onClose: () => void;
  severity: "success" | "error" | "info" | "warning";
  message: string;
};

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  open,
  onClose,
  severity,
  message,
}) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
