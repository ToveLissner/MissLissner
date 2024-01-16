import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Menu, MenuItem, Typography, Box } from "@mui/material";
import { User as UserType } from "../../models/User";
import LogInModal from "./LogInModal";
import LogOutButton from "./LogOutButton";
import { getBalanceAsync } from "../../domain/user/userSlice";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../domain/store";

type AppThunk = ThunkDispatch<RootState, null, Action<string>>;

const User: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch<AppThunk>();
  const userData = useSelector(
    (state: { user: { data: UserType } }) => state.user.data
  );
  const isLoggedIn = userData.isLoggedIn;
  const userID = userData.userID;

  console.log(userData);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const getBalanceAction = getBalanceAsync(userID);
        await dispatch(getBalanceAction);
        // await dispatch(getBalanceAsync(userID));
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
            <Typography variant="body1">{userData.balance}</Typography>
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

// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import LogInModal from "./LogInModal";
// import { Avatar, Menu, MenuItem, Typography, Box } from "@mui/material";
// import { User as UserType } from "../../models/User";
// import LogOutButton from "./LogOutButton";

// const User: React.FC = () => {
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const userData = useSelector(
//     (state: { user: { data: UserType } }) => state.user.data
//   );
//   console.log(userData);
//   const isLoggedIn = userData.isLoggedIn;

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
//     if (isLoggedIn) {
//       setAnchorEl(event.currentTarget);
//     } else {
//       setIsModalOpen(true);
//     }
//   };

//   return (
//     <>
//       <Box
//         display="flex"
//         alignItems="center"
//         onClick={handleClick}
//         style={{ cursor: "pointer" }}
//       >
//         {isLoggedIn ? (
//           <>
//             <Typography variant="body1" sx={{ mr: 1 }}>
//               Mitt konto
//             </Typography>
//             <Avatar />
//           </>
//         ) : (
//           <>
//             <Typography variant="body1" sx={{ mr: 1 }}>
//               Logga in
//             </Typography>
//             <Avatar />
//           </>
//         )}
//       </Box>
//       <Menu
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={handleMenuClose}
//       >
//         <MenuItem>Mina spel</MenuItem>
//         <MenuItem>Mitt konto</MenuItem>
//         {isLoggedIn && <LogOutButton onClick={handleMenuClose} />}
//       </Menu>
//       <LogInModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
//     </>
//   );
// };

// export default User;
