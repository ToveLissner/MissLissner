import express, { Router } from "express";
import bodyParser from "body-parser";

import {
  createUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
} from "../controllers/userController";

import { createUserValidator } from "../validators/userValidator";

const router: Router = express.Router();

router.use(bodyParser.json());

router.post("/", createUserValidator, createUserController);
router.get("/", getAllUsersController);
router.get("/:id", getUserByIdController);
router.put("/:id", updateUserController);
router.delete("/:id", deleteUserController);

export default router;
