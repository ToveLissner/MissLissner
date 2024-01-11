import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import User from "../User/User";
import colors from "../../ui-toolkit/colors";
// import SignUp from "../SignUp";

const Header: React.FC = () => {
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: colors.pinkBackgroundColor }}
    >
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          MissLissner
        </Typography>
        {/* <SignUp /> */}
        <User />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
