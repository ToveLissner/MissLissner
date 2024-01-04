import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import {
  createGame,
  deleteGame,
  getAllGames,
  getGameById,
  updateGame,
} from "./src/db/db";
import userRoutes from "./src/routes/userRoutes";
import { IGame } from "./src/models/IGame";
import gameAccountRoutes from "./src/routes/gameAccountRoutes";
import gameTypeRoutes from "./src/routes/gameTypeRoutes";

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

app.use("/game-types", gameTypeRoutes);

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
