import express, { Router } from "express";
import bodyParser from "body-parser";
import {
  createGameController,
  getAllGamesController,
  getGameByIdController,
  updateGameController,
  deleteGameController,
} from "../controllers/gameController";

const router: Router = express.Router();
router.use(bodyParser.json());

router.post("/", createGameController);
router.get("/", getAllGamesController);
router.get("/:id", getGameByIdController);
router.put("/:id", updateGameController);
router.delete("/:id", deleteGameController);

export default router;
