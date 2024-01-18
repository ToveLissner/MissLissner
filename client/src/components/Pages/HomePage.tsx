import React from "react";
import { Box, Typography } from "@mui/material";
import GamesToPlay from "../Game/GamesToPlay";

const HomePage: React.FC = () => {
  return (
    <Box>
      {/* <Typography variant="h1">Välkommen till startsidan!</Typography> */}
      <img src={process.env.PUBLIC_URL + "/images/1.jpeg"} alt="En bild" />
      <GamesToPlay />
    </Box>
  );
};

export default HomePage;
