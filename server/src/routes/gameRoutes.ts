import express, { Router } from "express";
import bodyParser from "body-parser";
import {
  createGameController,
  getAllGamesController,
  getGameByIdController,
  updateGameController,
  deleteGameController,
  getAllGamesByUserIdController,
} from "../controllers/gameController";
import {} from "../db/db";

const router: Router = express.Router();
router.use(bodyParser.json());

router.post("/", createGameController);
router.get("/", getAllGamesController);
router.get("/:id", getGameByIdController);
router.get("/user/:id", getAllGamesByUserIdController);
router.put("/:id", updateGameController);
router.delete("/:id", deleteGameController);

export default router;
