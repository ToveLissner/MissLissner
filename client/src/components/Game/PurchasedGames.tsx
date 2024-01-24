import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../domain/store";
import { Box, Typography, Pagination } from "@mui/material";
import GameCard from "./GameCard";

const PAGE_SIZE = 8;

const PurchasedGames: React.FC = () => {
  const gameData = useSelector((state: RootState) => state.game.games);
  const userData = useSelector((state: RootState) => state.user.data);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const paginatedGames = gameData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <Box sx={{ padding: 1, backgroundColor: "rgb(236, 236, 237)" }}>
      <Box sx={{ textAlign: "left", padding: 2, paddingBottom: 0 }}>
        <Typography variant="h4">Spelkvitton</Typography>
      </Box>

      {userData.isLoggedIn ? (
        <Box>
          {gameData.length > 0 ? (
            paginatedGames.map((game) => (
              <GameCard key={game.gameID} game={game} />
            ))
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
          )}
        </Box>
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
          <Typography>
            För att kunna se dina spelkvitton måste du vara inloggad
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          textAlign: "center",
          marginTop: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination
          count={Math.ceil(gameData.length / PAGE_SIZE)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default PurchasedGames;
