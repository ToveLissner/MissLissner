import React, { useState } from "react";
import { Button } from "@mui/material";
import SignUpModal from "./SignUpModal";

const SignUp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="success"
        onClick={handleOpenModal}
        sx={{ textTransform: "none", fontSize: "14px" }}
      >
        Öppna konto
      </Button>
      <SignUpModal open={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default SignUp;
