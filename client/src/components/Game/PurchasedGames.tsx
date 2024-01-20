import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../domain/store";
import { Box, Typography } from "@mui/material";
import GameCard from "./GameCard";

const PurchasedGames: React.FC = () => {
  const gameData = useSelector((state: RootState) => state.game.games);
  const userData = useSelector((state: RootState) => state.user.data);

  return (
    <>
      <Box sx={{ padding: 1, backgroundColor: "rgb(236, 236, 237)" }}>
        {userData.isLoggedIn ? (
          gameData.length > 0 ? (
            gameData.map((game) => <GameCard key={game.gameID} game={game} />)
          ) : (
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: "8px",
                padding: "16px",
                margin: "16px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>Inga kvitton hittades</Typography>
            </Box>
          )
        ) : null}
      </Box>
    </>
  );
};

export default PurchasedGames;
