import express, { Router } from "express";
import bodyParser from "body-parser";
import {
  getAllGameAccountsController,
  getGameAccountByIdController,
  updateGameAccountBalanceController,
} from "../controllers/gameAccountController";

const router: Router = express.Router();
router.use(bodyParser.json());

router.get("/", getAllGameAccountsController);
router.get("/:id", getGameAccountByIdController);
router.put("/:id", updateGameAccountBalanceController);

export default router;
