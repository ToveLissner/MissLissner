import express, { Application } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { IUser } from "./src/models/IUser";
import { createUser, getAllUsers } from "./src/db/db";

dotenv.config();

const app: Application = express();
const port = process.env.port || 4440;
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json("HomePageTest");
});

app.post("/users", async (req, res) => {
  const newUser = req.body as IUser;
  const userList = await createUser(newUser);
  console.log(userList);
  res.json(`user created`);
});

app.get("/users", async (req, res) => {
  try {
    const userList = await getAllUsers();
    res.json(userList);
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
