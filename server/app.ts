import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { IUser } from "./src/models/IUser";
import {
  createUser,
  deleteUser,
  getAllGameAccounts,
  getAllUsers,
  getGameAccountById,
  getUserById,
  updateGameAccountBalance,
  updateUser,
} from "./src/db/db";

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

app.get("/user/:id", async (req: Request, res: Response) => {
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

app.put("/user/:id", async (req: Request, res: Response) => {
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

app.delete("/user/:id", async (req: Request, res: Response) => {
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

app.get("/game-accounts/:accountID", async (req: Request, res: Response) => {
  const accountID = parseInt(req.params.accountID, 10);

  try {
    const gameAccount = await getGameAccountById(accountID);

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

app.put("/game-accounts/:accountID", async (req: Request, res: Response) => {
  const accountID = parseInt(req.params.accountID, 10);
  const newBalance = req.body.balance;

  try {
    await updateGameAccountBalance(accountID, newBalance);
    res.json({ message: "Game account balance updated successfully" });
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
