import React from "react";
import { Game } from "../../models/Game";
import { Box, Typography } from "@mui/material";

type GameCardProps = {
  game: Game;
};

const formatPurchaseDate = (purchaseDate?: string): string => {
  if (!purchaseDate) {
    return "N/A";
  }

  const date = new Date(purchaseDate);
  const formattedDate = date.toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return formattedDate;
};

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "8px",
        padding: "16px",
        margin: "16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography variant="body1">{`Speltyp: ${game.gameTypeID}`}</Typography>
      </Box>
      <Box sx={{ textAlign: "right", backgroundColor: "white" }}>
        <Typography variant="body2">{`Kostnad: ${game.price} kr`}</Typography>
        <Typography
          variant="body2"
          sx={{ fontWeight: "bold" }}
        >{`Inlämnad: ${formatPurchaseDate(game.purchaseDate)}`}</Typography>
      </Box>
    </Box>
  );
};

export default GameCard;
