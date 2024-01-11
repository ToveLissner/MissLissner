import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRoutes from "./src/routes/userRoutes";
import gameAccountRoutes from "./src/routes/gameAccountRoutes";
import gameTypeRoutes from "./src/routes/gameTypeRoutes";
import gameRoutes from "./src/routes/gameRoutes";
import authRoutes from "./src/routes/authRoutes";

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

// logIn //

app.use("/auth", authRoutes);

// gameAccounts //

app.use("/game-accounts", gameAccountRoutes);

// gameTypes //

app.use("/game-types", gameTypeRoutes);

// games //

app.use("/games", gameRoutes);

// server //

const run = () => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

run();
