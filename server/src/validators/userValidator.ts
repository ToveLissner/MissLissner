import { body } from "express-validator";

export const createUserValidator = [
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long"),
  body("password")
    .trim()
    .isLength({ min: 7 })
    .withMessage("Password must be at least 7 characters long"),
];
