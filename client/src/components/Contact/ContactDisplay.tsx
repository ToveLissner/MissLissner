import React from "react";
import { Box, Typography } from "@mui/material";

const ContactDisplay: React.FC = () => {
  const name = "Tove Lissner";
  const phoneNumber = "0735516899";
  const address = "Stockholm";
  const email = "Tove_Lissner@hotmail.com";

  return (
    <Box
      sx={{
        padding: "16px",
        maxWidth: "400px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "8px" }}
      >
        Kontakt
      </Typography>
      <Typography
        variant="body1"
        sx={{ fontSize: "1rem", marginBottom: "4px" }}
      >
        {name}
      </Typography>
      <Typography
        variant="body1"
        sx={{ fontSize: "1rem", marginBottom: "4px" }}
      >
        Telefonnummer: {phoneNumber}
      </Typography>
      <Typography
        variant="body1"
        sx={{ fontSize: "1rem", marginBottom: "4px" }}
      >
        Adress: {address}
      </Typography>
      <Typography
        variant="body1"
        sx={{ fontSize: "1rem", marginBottom: "4px" }}
      >
        E-post: {email}
      </Typography>
    </Box>
  );
};

export default ContactDisplay;
