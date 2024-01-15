import React, { useState } from "react";
import { TextField, Typography } from "@mui/material";
import CustomModal from "../../ui-toolkit/components/CustomModal";
import { createUser } from "../../services/userService";

type SignUpModalProps = {
  open: boolean;
  onClose: () => void;
};

const SignUpModal: React.FC<SignUpModalProps> = ({ open, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleInputUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setError("");
  };

  const handleInputPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setError("");
  };

  const handleConfirm = (data: any) => {
    console.log("SignUpModal confirmed with data:", data);
  };

  const handleCustomButtonClick = async () => {
    try {
      if (username.length < 3) {
        setError("Användarnamnet måste vara minst 3 tecken långt.");
        return;
      }

      if (password.length < 7) {
        setError("Lösenordet måste vara minst 7 tecken långt.");
        return;
      }
      await createUser(username, password);

      onClose();
    } catch (error: any) {
      if (error.message === "Användarnamnet är redan taget") {
        setError(
          "Användarnamnet är upptaget. Var vänlig välj ett annat användarnamn."
        );
      } else {
        console.error("Failed to create user:", error);
      }
    }
  };

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="Skapa användare"
      content={
        <>
          <TextField
            label="Användarnamn"
            variant="outlined"
            value={username}
            onChange={handleInputUsername}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Lösenord"
            variant="outlined"
            value={password}
            onChange={handleInputPassword}
            fullWidth
            type="password"
            margin="normal"
          />
          {error && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
        </>
      }
      buttonText="Skapa konto"
      onButtonClick={handleCustomButtonClick}
    />
  );
};

export default SignUpModal;
