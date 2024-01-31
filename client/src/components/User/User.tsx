import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Box,
  Button,
  IconButton,
  Stack,
} from "@mui/material";
import { UserAllInfo } from "../../models/User";
import LogInModal from "./LogInModal";
import LogOutButton from "./LogOutButton";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../domain/store";
import DepositModal from "./DepositModal";
import { getGamesByUserIdAsync } from "../../domain/slices/gameSlice";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

type AppThunk = ThunkDispatch<RootState, null, Action<string>>;

const User: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDepositModalOpen, setDepositModalOpen] = useState(false);
  const [showBalance, setShowBalance] = useState(true);

  const dispatch = useDispatch<AppThunk>();
  const userData = useSelector(
    (state: { user: { data: UserAllInfo } }) => state.user.data
  );
  const isLoggedIn = userData.isLoggedIn;
  const userID = userData.user.userID;

  const username = userData.user.username;

  const balance = userData.gameAccount.balance;

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

  useEffect(() => {
    const fetchGames = async () => {
      try {
        if (isLoggedIn && userID) {
          dispatch(getGamesByUserIdAsync(userID));
        }
      } catch (error) {
        console.error("Failed to fetch games:", error);
      }
    };

    fetchGames();
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

  const handleToggleBalance = () => {
    setShowBalance(!showBalance);
  };

  return (
    <>
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
        PaperProps={{
          sx: {
            backgroundColor: "white",
            width: "300px",
            height: "120vh",
          },
        }}
      >
        <Box
          sx={{
            p: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography>{username}</Typography>

          <Stack direction="row" alignItems="center">
            <IconButton onClick={handleToggleBalance}>
              {showBalance ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
            {showBalance ? (
              <Typography>{balance} kr</Typography>
            ) : (
              <Typography
                onClick={handleToggleBalance}
                style={{ cursor: "pointer" }}
              >
                Visa saldo
              </Typography>
            )}
          </Stack>

          <Button
            variant="contained"
            color="success"
            onClick={() => setDepositModalOpen(true)}
            sx={{
              mt: 2,
              textTransform: "none",
              width: "100%",
              height: "50px",
            }}
          >
            Sätt in pengar
          </Button>
        </Box>
        <Box sx={{ backgroundColor: "rgb(236, 236, 237)" }}>
          <Box sx={{ width: "100%", p: 1 }}>
            <Typography sx={{ color: "grey" }}>Mina spel</Typography>
          </Box>

          <MenuItem
            sx={{
              paddingLeft: 1,
              backgroundColor: "white",
              margin: "2px",
            }}
          >
            <Link
              to="/spelkvitton"
              style={{ textDecoration: "none", color: "black" }}
            >
              Spelkvitton
            </Link>
          </MenuItem>

          <Box sx={{ width: "100%", p: 1 }}>
            <Typography sx={{ color: "grey" }}>Mitt konto</Typography>
          </Box>
          <MenuItem
            sx={{
              paddingLeft: 1,
              backgroundColor: "white",
              margin: "2px",
            }}
          >
            Mina pengar
          </MenuItem>

          <MenuItem
            sx={{
              paddingLeft: 1,
              backgroundColor: "white",
              margin: "2px",
            }}
          >
            Kontoinställningar
          </MenuItem>

          <Box
            sx={{
              p: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            {isLoggedIn && <LogOutButton onClick={handleMenuClose} />}
          </Box>
        </Box>
      </Menu>
      <LogInModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default User;
