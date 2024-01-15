import React, { useEffect, useState } from "react";
import { TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logInAsync } from "../../domain/user/userSlice";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "@reduxjs/toolkit";
import { RootState } from "../../domain/store";
import CustomModal from "../../ui-toolkit/components/CustomModal";

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

      console.log("Före dispatch");

      const loginAction = logInAsync({ username, password });
      await dispatch(loginAction);

      console.log("Efter dispatch");
    } catch (error) {
      console.error("Failed to log in:", error);
      setError("Fel vid inloggning.");
    }
  };

  useEffect(() => {
    // Kolla om användaren är inloggad - stäng modalen om det är true
    if (isLoggedIn) {
      onClose();
    }
  }, [isLoggedIn, onClose]);

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      onConfirm={() => {}}
      title="Logga in"
      content={
        <>
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
          {error && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
        </>
      }
      buttonText="Logga in"
      onButtonClick={handleLogIn}
    />
  );
};

export default LogInModal;

// import React, { useState } from "react";
// import { Modal, Box, Typography, TextField, Button } from "@mui/material";
// import { useDispatch } from "react-redux";
// import { logInAsync } from "../../domain/user/userSlice";
// import { ThunkDispatch } from "redux-thunk";
// import { Action } from "@reduxjs/toolkit";
// import { RootState } from "../../domain/store";

// type LogInModalProps = {
//   open: boolean;
//   onClose: () => void;
// };

// type AppThunk = ThunkDispatch<RootState, null, Action<string>>;

// const LogInModal: React.FC<LogInModalProps> = ({ open, onClose }) => {
//   const dispatch = useDispatch<AppThunk>();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleInputUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setUsername(event.target.value);
//   };

//   const handleInputPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setPassword(event.target.value);
//   };

//   const handleLogIn = async () => {
//     try {
//       console.log("Före dispatch");

//       const loginAction = logInAsync({ username, password });
//       await dispatch(loginAction);

//       console.log("Efter dispatch");

//       // Stäng modalen efter inloggning
//       onClose();
//     } catch (error) {
//       console.error("Failed to log in:", error);
//     }
//   };

//   return (
//     <>
//       <Modal
//         open={open}
//         onClose={onClose}
//         aria-labelledby="simple-modal-title"
//         aria-describedby="simple-modal-description"
//       >
//         <Box>
//           <Typography variant="h6">Logga in</Typography>
//           <TextField
//             label="Användarnamn"
//             variant="outlined"
//             fullWidth
//             value={username}
//             onChange={handleInputUsername}
//             margin="normal"
//           />
//           <TextField
//             label="Lösenord"
//             variant="outlined"
//             fullWidth
//             type="password"
//             value={password}
//             onChange={handleInputPassword}
//             margin="normal"
//           />
//           <Button variant="contained" color="primary" onClick={handleLogIn}>
//             Logga in
//           </Button>
//         </Box>
//       </Modal>
//     </>
//   );
// };

// export default LogInModal;
