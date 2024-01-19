import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import SignUpButton from "../SignUp/SignUpButton";
import User from "../User/User";
import colors from "../../ui-toolkit/colors";
import { RootState } from "../../domain/store";
import SideMenu from "./SideMenu";

const Header: React.FC = () => {
  const [isSideMenuOpen, setSideMenuOpen] = useState(false);

  const isLoggedIn = useSelector(
    (state: RootState) => state.user.data.isLoggedIn
  );

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: colors.pinkBackgroundColor }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setSideMenuOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MissLissner
          </Typography>
          {!isLoggedIn && <SignUpButton />}
          <User />
        </Toolbar>
      </AppBar>
      <SideMenu open={isSideMenuOpen} onClose={() => setSideMenuOpen(false)} />
    </>
  );
};

export default Header;
