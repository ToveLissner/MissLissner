import { Request, Response } from "express";
import {
  getAllGameAccounts,
  getGameAccountById,
  updateGameAccountBalance,
} from "../db/db";

export const getAllGameAccountsController = async (
  req: Request,
  res: Response
) => {
  try {
    const gameAccounts = await getAllGameAccounts();
    res.json(gameAccounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getGameAccountByIdController = async (
  req: Request,
  res: Response
) => {
  const accountId = parseInt(req.params.id, 10);

  try {
    const gameAccount = await getGameAccountById(accountId);

    if (gameAccount) {
      res.json(gameAccount);
    } else {
      res.status(404).json({ error: "Game account not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateGameAccountBalanceController = async (
  req: Request,
  res: Response
) => {
  const userID = parseInt(req.params.id, 10);
  const newBalance = req.body.balance;

  try {
    await updateGameAccountBalance(userID, newBalance);
    res.json({ message: "Game account balance updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
