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

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const PurchasedGames: React.FC = () => {
  const gameData = useSelector((state: RootState) => state.game.games);
  const userData = useSelector((state: RootState) => state.user.data);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<string>("");
  const [sortOption, setSortOption] = useState<"gameType" | "purchaseDate">(
    "purchaseDate"
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handleTimePeriodChange = (event: SelectChangeEvent<string>) => {
    setSelectedTimePeriod(event.target.value);
  };

  const handleSortChange = (newSortOption: "gameType" | "purchaseDate") => {
    setSortOption(newSortOption);
  };

  const uniqueMonths = Array.from(
    new Set(
      gameData.map((game) =>
        capitalizeFirstLetter(
          new Intl.DateTimeFormat("sv-SE", {
            month: "long",
            year: "numeric",
          }).format(new Date(game.purchaseDate || ""))
        )
      )
    )
  );

  const sortedGames = [...gameData];
  if (sortOption === "gameType") {
    sortedGames.sort((a, b) => a.gameTypeID - b.gameTypeID);
  } else if (sortOption === "purchaseDate") {
    sortedGames.sort(
      (a, b) =>
        new Date(b.purchaseDate || "").getTime() -
        new Date(a.purchaseDate || "").getTime()
    );
  }

  const filteredGames = sortedGames.filter((game) => {
    const gameTimestamp = new Date(game.purchaseDate || "").getTime();
    const now = new Date().getTime();

    switch (selectedTimePeriod) {
      case "week":
        return now - gameTimestamp <= 7 * 24 * 60 * 60 * 1000; // En vecka i millisekunder
      case "day":
        return now - gameTimestamp <= 24 * 60 * 60 * 1000; // En dag i millisekunder
      case "all":
        return true;
      default:
        return true;
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

      {/* Filtreringsrutan */}
      <Box
        sx={{
          textAlign: "center",
          marginTop: 2,
          marginBottom: 2,
          display: "flex",
          alignItems: "center",

          justifyContent: "center",
          "& .MuiSelect-select": {
            backgroundColor: "white",
          },
          "& .MuiSelect-icon": {
            color: "black",
          },
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
          <MenuItem value="day">Senaste dygnet</MenuItem>
          <MenuItem value="week">Senaste veckan</MenuItem>
          <MenuItem value="all">Sedan start</MenuItem>
          {uniqueMonths.map((month) => (
            <MenuItem key={month} value={month}>
              {month}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Sorteringsrutan */}
      <Box
        sx={{
          textAlign: "center",
          marginTop: 2,
          marginBottom: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "& .MuiSelect-select": {
            backgroundColor: "white",
          },
          "& .MuiSelect-icon": {
            color: "black",
          },
        }}
      >
        <Typography variant="subtitle1" sx={{ marginRight: 1 }}>
          Sortera efter:
        </Typography>
        <Select
          value={sortOption}
          onChange={(e) => handleSortChange(e.target.value as any)}
        >
          <MenuItem value="purchaseDate">Datum</MenuItem>
          <MenuItem value="gameType">Spelform</MenuItem>
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
