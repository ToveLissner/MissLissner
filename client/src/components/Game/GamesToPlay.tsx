import React, { useEffect, useState } from "react";
import { getAllGameTypesService } from "../../services/gameService";
import { GameType } from "../../models/GameType";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import AtgIcon from "../../ui-toolkit/components/AtgIcon";
import colors from "../../ui-toolkit/colors";
import { useSelector } from "react-redux";
import { UserAllInfo } from "../../models/User";
import PreLogInModal from "../User/PreLogInModal";
import GameToPlayModal from "./GameToPlayModal";

const GamesToPlay: React.FC = () => {
  const [gameTypes, setGameTypes] = useState<GameType[]>([]);
  const [selectedGame, setSelectedGame] = useState<GameType | null>(null);
  const [isPreLogInModalOpen, setPreLogInModalOpen] = useState(false);
  const [isGameToPlayModalOpen, setGameToPlayModalOpen] = useState(false);

  const userData = useSelector(
    (state: { user: { data: UserAllInfo } }) => state.user.data
  );
  const isLoggedIn = userData.isLoggedIn;

  useEffect(() => {
    const fetchGameTypes = async () => {
      try {
        const fetchedGameTypes = await getAllGameTypesService();
        setGameTypes(fetchedGameTypes);
      } catch (error) {
        console.error("Error fetching game types:", error);
      }
    };

    fetchGameTypes();
  }, []);

  const getColor = (gameType: GameType) => {
    return selectedGame === gameType
      ? colors[`${gameType.gameType}backgroundMarked`]
      : colors[`${gameType.gameType}background`];
  };

  const handleCardClick = (clickedGame: GameType) => {
    setSelectedGame(clickedGame);
    if (isLoggedIn === true) {
      setGameToPlayModalOpen(true);
    } else {
      setPreLogInModalOpen(true);
    }
  };

  return (
    <Box p={2} sx={{ backgroundColor: "rgb(236, 236, 237)" }}>
      <Grid container spacing={2}>
        {gameTypes.map((gameType) => (
          <Grid
            item
            xs={gameTypes.length % 2 === 0 ? 6 : 12}
            sm={gameTypes.length % 3 === 0 ? 4 : 12}
            md={12 / gameTypes.length}
            key={gameType.gameTypeID}
          >
            <Card
              elevation={4}
              // style={{ height: "100%", cursor: "pointer" }}
              sx={{
                cursor: "pointer",
                backgroundColor: getColor(gameType),
                "&:hover": {
                  backgroundColor:
                    colors[`${gameType.gameType}backgroundMarked`],
                },
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
              onClick={() => handleCardClick(gameType)}
            >
              <CardContent>
                <Typography
                  sx={{
                    fontSize: "30px",
                    fontWeight: "900",
                    whiteSpace: "nowrap",
                    textTransform: "uppercase",
                    display: "flex",
                    alignItems: "center",
                    color: "rgb(255, 255, 255)",
                  }}
                  component="div"
                >
                  {gameType.gameType}
                  <Box
                    sx={{
                      transform: "scale(2)",
                      marginTop: "1em",
                    }}
                  >
                    <AtgIcon />
                  </Box>
                </Typography>
              </CardContent>
            </Card>
            <Box sx={{ backgroundColor: "white" }}>
              <Button
                onClick={() => handleCardClick(gameType)}
                sx={{
                  textTransform: "none",
                  cursor: "pointer",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  color: "rgb(32, 124, 184)",
                  "&:hover": {
                    color: "black",
                    backgroundColor: "transparent",
                  },
                }}
              >
                Välj belopp
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
      <PreLogInModal
        open={isPreLogInModalOpen}
        onClose={() => setPreLogInModalOpen(false)}
      />
      <GameToPlayModal
        open={isGameToPlayModalOpen}
        onClose={() => setGameToPlayModalOpen(false)}
        selectedGame={selectedGame!}
      />
    </Box>
  );
};

export default GamesToPlay;
