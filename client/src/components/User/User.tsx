import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Menu, MenuItem, Typography, Box } from "@mui/material";
import { UserAllInfo } from "../../models/User";
import LogInModal from "./LogInModal";
import LogOutButton from "./LogOutButton";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../domain/store";
import DepositModal from "./DepositModal";

type AppThunk = ThunkDispatch<RootState, null, Action<string>>;

const User: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDepositModalOpen, setDepositModalOpen] = useState(false);

  const dispatch = useDispatch<AppThunk>();
  const userData = useSelector(
    (state: { user: { data: UserAllInfo } }) => state.user.data
  );
  const isLoggedIn = userData.isLoggedIn;
  const userID = userData.user.userID;

  console.log(userData);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
      } catch (error) {
        console.error("Failed to fetch balance:", error);
      }
    };

    if (isLoggedIn && userID) {
      fetchBalance();
    }
  }, [dispatch, isLoggedIn, userID]);

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
      {" "}
      {isDepositModalOpen && (
        <DepositModal
          open={isDepositModalOpen}
          onClose={() => setDepositModalOpen(false)}
        />
      )}
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
        <MenuItem onClick={() => setDepositModalOpen(true)}>
          Sätt in pengar
        </MenuItem>
        <MenuItem>Mina spel</MenuItem>
        <MenuItem>Mitt konto</MenuItem>
        <MenuItem>
          {isLoggedIn && <LogOutButton onClick={handleMenuClose} />}
        </MenuItem>
      </Menu>
      <LogInModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default User;
