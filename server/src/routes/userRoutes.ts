import express, { Router } from "express";
import bodyParser from "body-parser";

import {
  createUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
  getUserInfoController,
} from "../controllers/userController";

import { createUserValidator } from "../validators/userValidator";

const router: Router = express.Router();

router.use(bodyParser.json());

router.post("/", createUserValidator, createUserController);
router.get("/", getAllUsersController);
router.get("/:id", getUserByIdController);
router.put("/:id", updateUserController);
router.delete("/:id", deleteUserController);

router.get("/:id/allInfo", getUserInfoController);

export default router;
