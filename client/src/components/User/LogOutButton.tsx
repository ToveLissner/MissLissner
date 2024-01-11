import React from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../domain/user/userSlice";
import { Button } from "@mui/material";

const LogOutButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
    onClick();
  };

  return (
    <Button
      variant="outlined"
      onClick={handleLogout}
      sx={{ textTransform: "none" }}
    >
      Logga ut
    </Button>
  );
};

export default LogOutButton;
