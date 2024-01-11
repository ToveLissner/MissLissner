import React, { useState } from "react";
import { useSelector } from "react-redux";
import LogInModal from "./LogInModal";
import { Avatar, Menu, MenuItem, Typography, Box } from "@mui/material";
import { selectUserData } from "../../domain/user/userSlice";
import LogOutButton from "./LogOutButton";

const User: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userData = useSelector(selectUserData);
  console.log(userData);
  const isLoggedIn = userData.isLoggedIn;

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (isLoggedIn) {
      setAnchorEl(event.currentTarget);
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      >
        {isLoggedIn ? (
          <>
            <Typography variant="body1" sx={{ mr: 1 }}>
              Mitt konto
            </Typography>
            <Avatar />
          </>
        ) : (
          <>
            <Typography variant="body1" sx={{ mr: 1 }}>
              Logga in
            </Typography>
            <Avatar />
          </>
        )}
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem>Mina spel</MenuItem>
        <MenuItem>Mitt konto</MenuItem>
        {isLoggedIn && <LogOutButton onClick={handleMenuClose} />}
      </Menu>
      <LogInModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default User;
