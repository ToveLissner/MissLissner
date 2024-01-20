import React, { useEffect, useState } from "react";
import { TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logInAsync } from "../../domain/slices/userSlice";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "@reduxjs/toolkit";
import { RootState } from "../../domain/store";
import CustomModal from "../../ui-toolkit/components/CustomModal";
import CustomSnackbar from "../../ui-toolkit/components/CustomSnackbar";

type LogInModalProps = {
  open: boolean;
  onClose: () => void;
};

type AppThunk = ThunkDispatch<RootState, null, Action<string>>;

const LogInModal: React.FC<LogInModalProps> = ({ open, onClose }) => {
  const dispatch = useDispatch<AppThunk>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const isLoggedIn = useSelector(
    (state: RootState) => state.user.data.isLoggedIn
  );

  const handleInputUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setError("");
  };

  const handleInputPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setError("");
  };

  const handleLogIn = async () => {
    try {
      if (!username || !password) {
        setError("Användarnamn och lösenord är obligatoriska fält.");
        return;
      }

      if (!isLoggedIn) {
        setError("Användarnamn och/eller lösenord är felaktigt.");
      }

      const loginAction = logInAsync({ username, password });
      await dispatch(loginAction);
      setLoginSuccess(true);
    } catch (error) {
      console.error("Failed to log in:", error);
      setError("Fel vid inloggning.");
    }
  };

  useEffect(() => {
    if (isLoggedIn && loginSuccess) {
      setError("");
      onClose();
      setSnackbarSeverity("success");
      setSnackbarMessage("Inloggningen lyckades!");
      setSnackbarOpen(true);
      setLoginSuccess(false);
    }
  }, [isLoggedIn, loginSuccess, onClose]);

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
        title="Logga in"
        // modalTitle="Ange användarnamn och lösenord"
        content={
          <>
            <Typography sx={{ paddingBottom: 2 }}>
              Logga in med ditt användarnamn och lösenord
            </Typography>
            <TextField
              label="Användarnamn"
              variant="outlined"
              fullWidth
              value={username}
              onChange={handleInputUsername}
              sx={{ marginTop: 0 }}
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
            {error && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
          </>
        }
        buttonText="Logga in"
        onButtonClick={handleLogIn}
        isButtonDisabled={isButtonDisabled}
      />
      <CustomSnackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </>
  );
};

export default LogInModal;
