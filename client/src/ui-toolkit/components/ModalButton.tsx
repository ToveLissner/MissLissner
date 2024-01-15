import React from "react";
import { Button } from "@mui/material";

type ModalButtonProps = {
  onClick: () => void;
  buttonText: string;
};

const ModalButton: React.FC<ModalButtonProps> = ({ onClick, buttonText }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      sx={{ mt: 2, textTransform: "none", width: "100%" }}
    >
      {buttonText}
    </Button>
  );
};

export default ModalButton;
