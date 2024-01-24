import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../domain/store";
import {
  Box,
  Typography,
  Pagination,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import GameCard from "./GameCard";

const PAGE_SIZE = 8;

const PurchasedGames: React.FC = () => {
  const gameData = useSelector((state: RootState) => state.game.games);
  const userData = useSelector((state: RootState) => state.user.data);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<string>("");

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handleTimePeriodChange = (event: SelectChangeEvent<string>) => {
    setSelectedTimePeriod(event.target.value);
  };

  // Filtrera spel
  const filteredGames = gameData.filter((game) => {
    const gameTimestamp = new Date(game.purchaseDate || "").getTime();
    const now = new Date().getTime();

    switch (selectedTimePeriod) {
      case "week":
        return now - gameTimestamp <= 7 * 24 * 60 * 60 * 1000; // En vecka i millisekunder
      case "day":
        return now - gameTimestamp <= 24 * 60 * 60 * 1000; // En dag i millisekunder
      // Lägg till fler tidsperioder ??
      default:
        return true; // Inga filter, visa alla spel
    }
  });

  const paginatedGames = filteredGames.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <Box sx={{ padding: 1, backgroundColor: "rgb(236, 236, 237)" }}>
      <Box sx={{ textAlign: "left", padding: 2, paddingBottom: 0 }}>
        <Typography variant="h4">Spelkvitton</Typography>
      </Box>

      {/* Dropdown för tidsintervall */}
      <Box
        sx={{
          textAlign: "center",
          marginTop: 2,
          marginBottom: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="subtitle1" sx={{ marginRight: 1 }}>
          Filtrera:
        </Typography>
        <Select
          value={selectedTimePeriod}
          onChange={handleTimePeriodChange}
          displayEmpty
        >
          <MenuItem value="" disabled>
            Välj tidsintervall
          </MenuItem>
          <MenuItem value="week">Senaste veckan</MenuItem>
          <MenuItem value="day">Senaste dygnet</MenuItem>
        </Select>
      </Box>

      {userData.isLoggedIn ? (
        <Box>
          {paginatedGames.length > 0 ? (
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
          count={Math.ceil(filteredGames.length / PAGE_SIZE)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default PurchasedGames;
