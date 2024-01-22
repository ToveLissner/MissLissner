import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Grid } from "@mui/material";
import { Game } from "../../models/Game";
import { GameType } from "../../models/GameType";
import { getGameTypeByIdService } from "../../services/gameService";

// använd userID för att hämta username istället för id

type GameCardDetailedProps = {
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
  });

  return formattedDate;
};

const formatPurchaseDateTime = (purchaseDate?: string): string => {
  if (!purchaseDate) {
    return "N/A";
  }

  const date = new Date(purchaseDate);
  const formattedDateTime = date.toLocaleTimeString("sv-SE", {
    hour: "numeric",
    minute: "numeric",
  });

  return formattedDateTime;
};

const GameCardDetailed: React.FC<GameCardDetailedProps> = ({ game }) => {
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

  if (!gameType || game.price === undefined || game.userID === undefined) {
    return (
      <Box sx={{ textAlign: "center", padding: "16px" }}>
        <CircularProgress />
        <Typography variant="body1">Väntar på data...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "260px",
        backgroundColor: "white",
        borderRadius: "8px",
        padding: "16px",
        margin: "16px",
        border: "2px solid #ccc",
      }}
    >
      <Grid container spacing={2}>
        {/* Vänster sida */}
        <Grid item xs={12} sm={6} sx={{ textAlign: "left" }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", marginBottom: "8px" }}
          >
            {gameType && gameType.gameType.toUpperCase()}
          </Typography>

          <Typography
            variant="body2"
            sx={{ whiteSpace: "nowrap", marginTop: "16px" }}
          >
            {`Spelkvitto: ${game.gameID}`}
          </Typography>
        </Grid>

        {/* Höger sida */}
        <Grid item xs={12} sm={6} sx={{ textAlign: "right" }}>
          <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
            Inlämnat:
          </Typography>
          <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
            {`${formatPurchaseDate(
              game.purchaseDate
            )}, ${formatPurchaseDateTime(game.purchaseDate)}`}
          </Typography>
          <Typography
            variant="body2"
            sx={{ whiteSpace: "nowrap", marginTop: "8px" }}
          >
            {`Köpare: ${game.userID}`}
          </Typography>
          <Typography
            variant="body2"
            sx={{ whiteSpace: "nowrap", fontWeight: "bold" }}
          >
            {`Kostnad: ${game.price} kr`}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GameCardDetailed;
