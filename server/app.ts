import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import {
  createGame,
  createGameType,
  deleteGame,
  deleteGameType,
  getAllGameTypes,
  getAllGames,
  getGameById,
  getGameTypeByGameType,
  updateGame,
  updateGameType,
} from "./src/db/db";
import userRoutes from "./src/routes/userRoutes";
import { IGameType } from "./src/models/IGameType";
import { IGame } from "./src/models/IGame";
import gameAccountRoutes from "./src/routes/gameAccountRoutes";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 4440;
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.json("MissLissner");
});

// users //

app.use("/users", userRoutes);

// gameAccounts //

app.use("/game-accounts", gameAccountRoutes);

// gameTypes //

app.post("/game-types", async (req: Request, res: Response) => {
  const newGameType = req.body as IGameType;
  try {
    const gameTypeID = await createGameType(newGameType);
    res.json(`Game type created successfully with ID: ${gameTypeID}`);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to create game type" });
  }
});

app.get("/game-types", async (req: Request, res: Response) => {
  try {
    const gameTypes = await getAllGameTypes();
    res.json(gameTypes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/game-types/:gameType", async (req: Request, res: Response) => {
  const gameType = req.params.gameType;

  try {
    const retrievedGameType = await getGameTypeByGameType(gameType);

    if (retrievedGameType) {
      res.json(retrievedGameType);
    } else {
      res.status(404).json({ error: "Game type not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/game-types/:gameType", async (req: Request, res: Response) => {
  const gameType = req.params.gameType;
  const updatedGameType = req.body as IGameType;

  try {
    await updateGameType(gameType, updatedGameType);
    res.json({ message: "Game type updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/game-types/:gameType", async (req: Request, res: Response) => {
  const gameType = req.params.gameType;

  try {
    await deleteGameType(gameType);
    res.json({ message: "Game type deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// games //

app.post("/games", async (req: Request, res: Response) => {
  const newGame = req.body as IGame;

  try {
    const gameID = await createGame(newGame);
    res.json(`Game created successfully with ID: ${gameID}`);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to create game" });
  }
});

app.get("/games", async (req: Request, res: Response) => {
  try {
    const gameList = await getAllGames();
    res.json(gameList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/games/:id", async (req: Request, res: Response) => {
  const gameId = parseInt(req.params.id, 10);

  try {
    const game = await getGameById(gameId);

    if (game) {
      res.json(game);
    } else {
      res.status(404).json({ error: "Game not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/games/:id", async (req: Request, res: Response) => {
  const gameId = parseInt(req.params.id, 10);
  const updatedGame = req.body as IGame;

  try {
    await updateGame(gameId, updatedGame);
    res.json({ message: "Game updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/games/:id", async (req: Request, res: Response) => {
  const gameId = parseInt(req.params.id, 10);

  try {
    await deleteGame(gameId);
    res.json({ message: "Game deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// server //

const run = () => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

run();
