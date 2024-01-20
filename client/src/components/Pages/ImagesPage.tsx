import React from "react";
import { Box, Paper, Typography } from "@mui/material";

const ImagesPage: React.FC = () => {
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
  return (
    <Box>
      <Paper sx={heroImageStyle}>
        <Typography variant="h3">För dig som vill vara med i spelet</Typography>
      </Paper>
      <Box>
        <img src={process.env.PUBLIC_URL + "/images/1.jpeg"} alt="En bild" />
      </Box>
    </Box>
  );
};

export default ImagesPage;
