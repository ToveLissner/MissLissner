import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../domain/slices/userSlice";
import { Button } from "@mui/material";
import logOutButtonStyles from "./styles/logOutButtonStyles";

const LogOutButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/");
    onClick();
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleLogout}
        sx={logOutButtonStyles.button}
      >
        Logga ut
      </Button>
    </>
  );
};

export default LogOutButton;
