import { Request, Response } from "express";
import { validationResult } from "express-validator";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getGameAccountByUserId,
} from "../db/db";
import { IUser } from "../models/IUser";

export const createUserController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const newUser = req.body as IUser;
    await createUser(newUser);
    res.json({ message: "User created successfully", newUser });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to create user" });
  }
};

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const userList = await getAllUsers();
    res.json(userList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserByIdController = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);

  try {
    const user = await getUserById(userId);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  const updatedUser = req.body as IUser;

  try {
    await updateUser(userId, updatedUser);
    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);

  try {
    await deleteUser(userId);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserInfoController = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);

  try {
    const user = await getUserById(userId);

    if (user) {
      const gameAccount = await getGameAccountByUserId(userId);

      const userData = {
        user,
        gameAccount,
      };

      res.json(userData);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
