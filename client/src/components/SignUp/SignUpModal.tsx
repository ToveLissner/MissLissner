import React, { useState } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
// import { createUser } from "../../services/userService";
import ModalHeader from "../../ui-toolkit/components/ModalHeader";

type SignUpModalProps = {
  open: boolean;
  onClose: () => void;
};

const SignUpModal: React.FC<SignUpModalProps> = ({ open, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleInputUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleInputPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleCreateUser = async () => {
    try {
      // Anropa userService för att skapa användaren
      //   await createUser({ username, password });
      console.log("Du tryckte, men ej registrerad än");
      // Stäng modalen efter att användaren har skapats
      onClose();
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "300px",
          bgcolor: "white",
          boxShadow: 3,
          borderRadius: "8px",
          p: 4,
        }}
      >
        <ModalHeader title="Skapa användare" onClose={onClose} />

        <TextField
          label="Användarnamn"
          variant="outlined"
          fullWidth
          value={username}
          onChange={handleInputUsername}
          margin="normal"
        />
        <TextField
          label="Lösenord"
          variant="outlined"
          fullWidth
          type="password"
          value={password}
          onChange={handleInputPassword}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateUser}
          sx={{ mt: 2 }}
        >
          Skapa användare
        </Button>
      </Box>
    </Modal>
  );
};

export default SignUpModal;
