import React from "react";
import { Box, Typography } from "@mui/material";

const ImagesPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h1">Bildsida</Typography>
      <img src={process.env.PUBLIC_URL + "/images/1.jpeg"} alt="En bild" />
    </Box>
  );
};

export default ImagesPage;
