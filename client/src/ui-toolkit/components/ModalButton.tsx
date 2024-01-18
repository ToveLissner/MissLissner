import React from "react";
import { Button } from "@mui/material";

type ModalButtonProps = {
  onClick: () => void;
  buttonText: string;
  isButtonDisabled?: boolean;
  buttonColor?: "primary" | "success";
};

const ModalButton: React.FC<ModalButtonProps> = ({
  onClick,
  buttonText,
  isButtonDisabled,
  buttonColor,
}) => {
  return (
    <Button
      variant="contained"
      color={buttonColor}
      onClick={onClick}
      disabled={isButtonDisabled}
      sx={{
        mt: 2,
        textTransform: "none",
        width: "100%",
        height: "50px",
      }}
    >
      {buttonText}
    </Button>
  );
};

export default ModalButton;
