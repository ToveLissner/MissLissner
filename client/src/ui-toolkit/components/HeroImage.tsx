import React from "react";
import { Box, Paper, Typography } from "@mui/material";

type HeroImageProps = {
  imageUrl: string;
  title: string;
  subtitle?: string;
  height?: string;
};

const HeroImage: React.FC<HeroImageProps> = ({
  imageUrl,
  title,
  height = "60vh",
  subtitle,
}) => {
  const heroImageStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    height: height,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    padding: "20px",
  };

  return (
    <Box>
      <Paper sx={heroImageStyle}>
        <Typography variant="h3">{title}</Typography>
        <Typography variant="h4">{subtitle}</Typography>
      </Paper>
    </Box>
  );
};

export default HeroImage;
