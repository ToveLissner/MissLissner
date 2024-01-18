import React from "react";
import { Button } from "@mui/material";

type ModalButtonProps = {
  onClick: () => void;
  buttonText: string;
  isButtonDisabled?: boolean;
};

const ModalButton: React.FC<ModalButtonProps> = ({
  onClick,
  buttonText,
  isButtonDisabled,
}) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      disabled={isButtonDisabled}
      sx={{
        mt: 2,
        textTransform: "none",
        width: "100%",
        ...(isButtonDisabled && {
          backgroundColor: "gray",
          color: "white",
        }),
      }}
    >
      {buttonText}
    </Button>
  );
};

export default ModalButton;
