import express, { Router } from "express";
import bodyParser from "body-parser";
import { loginController } from "../controllers/authController";

const router: Router = express.Router();
router.use(bodyParser.json());

router.post("/login", loginController);

export default router;
