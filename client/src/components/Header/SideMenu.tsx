import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";

type SideMenuProps = {
  open: boolean;
  onClose: () => void;
};

const SideMenu: React.FC<SideMenuProps> = ({ open, onClose }) => {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: "white",
          width: "300px",
        },
      }}
    >
      <List>
        <ListItemButton component={Link} to="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Hem" />
        </ListItemButton>
        <ListItemButton component={Link} to="/about">
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="Om" />
        </ListItemButton>
        <ListItemButton component={Link} to="/contact">
          <ListItemIcon>
            <ContactSupportIcon />
          </ListItemIcon>
          <ListItemText primary="Kontakt" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default SideMenu;
