import express, { Router } from "express";
import bodyParser from "body-parser";
import {
  createGameTypeController,
  getAllGameTypesController,
  getGameTypeByGameTypeController,
  updateGameTypeController,
  deleteGameTypeController,
} from "../controllers/gameTypeController";

const router: Router = express.Router();
router.use(bodyParser.json());

router.post("/", createGameTypeController);
router.get("/", getAllGameTypesController);
router.get("/:gameType", getGameTypeByGameTypeController);
router.put("/:gameType", updateGameTypeController);
router.delete("/:gameType", deleteGameTypeController);

export default router;
