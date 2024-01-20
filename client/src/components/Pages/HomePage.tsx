import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import GamesToPlay from "../Game/GamesToPlay";

const HomePage: React.FC = () => {
  const heroImageStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/3.jpeg)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "60vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    padding: "20px",
  };

  const heroImageStyle2 = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/7.jpeg)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "400px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    padding: "20px",
  };

  return (
    <Box>
      <Paper sx={heroImageStyle}>
        <Typography variant="h3">För dig som vill vara med i spelet</Typography>
        <Typography variant="h4"> - men gärna unviker jobbet</Typography>
      </Paper>
      <GamesToPlay />
      <Paper sx={heroImageStyle2}>
        <Typography variant="h3">Låt spelet starta</Typography>
      </Paper>
    </Box>
  );
};

export default HomePage;
