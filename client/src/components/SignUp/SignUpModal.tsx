import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import CustomModal from "../../ui-toolkit/components/CustomModal";
import CustomSnackbar from "../../ui-toolkit/components/CustomSnackbar";
import { createUserService } from "../../services/userService";
import SuccessCreateAccountModal from "./SuccessCreateAccountModal";

type SignUpModalProps = {
  open: boolean;
  onClose: () => void;
};

const SignUpModal: React.FC<SignUpModalProps> = ({ open, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleInputUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setError("");
  };

  const handleInputPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setError("");
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
      await createUserService(username, password);

      setSnackbarSeverity("success");
      setSnackbarMessage("Användaren har skapats framgångsrikt!");
      setShowSuccessModal(true);
      setSnackbarOpen(true);

      onClose();
    } catch (error: any) {
      if (error.message === "Användarnamnet är redan taget") {
        setError(
          "Användarnamnet är upptaget. Var vänlig välj ett annat användarnamn."
        );
        setSnackbarSeverity("error");
        setSnackbarMessage("Användarnamnet är upptaget.");
        setSnackbarOpen(true);
      } else {
        console.error("Failed to create user:", error);
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const isButtonDisabled = !username || !password;

  return (
    <>
      <CustomModal
        open={open}
        onClose={onClose}
        onConfirm={() => {}}
        title="Skapa konto"
        content={
          <>
            <Box
              sx={{
                textAlign: "center",
                fontStyle: "italic",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                }}
              >
                Ta del av spännande spelupplevelser!
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  marginBottom: "20px",
                }}
              >
                Skapa ditt konto på 1 min.
              </Typography>
            </Box>
            <TextField
              label="Användarnamn"
              variant="outlined"
              value={username}
              onChange={handleInputUsername}
              fullWidth
              sx={{ marginTop: 0 }}
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
        isButtonDisabled={isButtonDisabled}
      />
      <CustomSnackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
      {showSuccessModal && (
        <SuccessCreateAccountModal
          open={true}
          onClose={() => setShowSuccessModal(false)}
        />
      )}
    </>
  );
};

export default SignUpModal;
