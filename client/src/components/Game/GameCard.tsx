import React, { useEffect, useState } from "react";
import { Game } from "../../models/Game";
import { Box, Typography } from "@mui/material";
import { GameType } from "../../models/GameType";
import { getGameTypeByIdService } from "../../services/gameService";
import gameCardStyles from "./styles/gameCardStyles";

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
  const [gameType, setGameType] = useState<GameType | null>(null);

  useEffect(() => {
    const fetchGameType = async () => {
      try {
        const fetchedGameType = await getGameTypeByIdService(game.gameTypeID);
        setGameType(fetchedGameType);
      } catch (error) {
        console.error("Error fetching game type:", error);
      }
    };

    fetchGameType();
  }, [game]);

  return (
    <Box sx={gameCardStyles.container}>
      <Box>
        <Typography variant="body1">
          {gameType ? gameType.gameType.toUpperCase() : "N/A"}
        </Typography>
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
