import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { IUser } from "./src/models/IUser";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "./src/db/db";

dotenv.config();

const app: Application = express();
const port = process.env.port || 4440;
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

const run = () => {
  try {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (e) {
    console.log(`Something went wrong ${e}`);
  }
};

run();
