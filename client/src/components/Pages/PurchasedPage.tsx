import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../domain/store";
import PurchasedGames from "../Game/PurchasedGames";

const PurchasedPage: React.FC = () => {
  const games = useSelector((state: RootState) => state.game.games);

  console.log(games);

  const heroImageStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/3.jpeg)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "10vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    padding: "20px",
  };

  return (
    <>
      <Box>
        <Paper sx={heroImageStyle}>
          <Typography variant="h3">Låt spelet starta</Typography>
        </Paper>
      </Box>

      <PurchasedGames />
    </>
  );
};

export default PurchasedPage;
