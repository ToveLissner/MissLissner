import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { IUser } from "./src/models/IUser";
import {
  createGameType,
  createUser,
  deleteGameType,
  deleteUser,
  getAllGameAccounts,
  getAllGameTypes,
  getAllUsers,
  getGameAccountById,
  getGameTypeByGameType,
  getUserById,
  updateGameAccountBalance,
  updateGameType,
  updateUser,
} from "./src/db/db";
import { IGameType } from "./src/models/IGameType";

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

app.post("/users", async (req: Request, res: Response) => {
  const newUser = req.body as IUser;

  try {
    await createUser(newUser);
    res.json(`User created successfully`);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to create user" });
  }
});

app.get("/users", async (req: Request, res: Response) => {
  try {
    const userList = await getAllUsers();
    res.json(userList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/users/:id", async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);

  try {
    const user = await getUserById(userId);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/users/:id", async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  const updatedUser = req.body as IUser;

  try {
    await updateUser(userId, updatedUser);
    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/users/:id", async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);

  try {
    await deleteUser(userId);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// gameAccounts //

app.get("/game-accounts", async (req: Request, res: Response) => {
  try {
    const gameAccounts = await getAllGameAccounts();
    res.json(gameAccounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/game-accounts/:id", async (req: Request, res: Response) => {
  const accountId = parseInt(req.params.id, 10);

  try {
    const gameAccount = await getGameAccountById(accountId);

    if (gameAccount) {
      res.json(gameAccount);
    } else {
      res.status(404).json({ error: "Game account not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/game-accounts/:id", async (req: Request, res: Response) => {
  const accountId = parseInt(req.params.id, 10);
  const newBalance = req.body.balance;

  try {
    await updateGameAccountBalance(accountId, newBalance);
    res.json({ message: "Game account balance updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

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

// server //

const run = () => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

run();
