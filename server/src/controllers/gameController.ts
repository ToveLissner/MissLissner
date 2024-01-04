import { Request, Response } from "express";
import {
  createGame,
  deleteGame,
  getAllGames,
  getGameById,
  updateGame,
} from "../db/db";
import { IGame } from "../models/IGame";

export const createGameController = async (req: Request, res: Response) => {
  const newGame = req.body as IGame;

  try {
    const gameID = await createGame(newGame);
    res.json({ message: `Game created successfully with ID: ${gameID}` });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to create game" });
  }
};

export const getAllGamesController = async (req: Request, res: Response) => {
  try {
    const gameList = await getAllGames();
    res.json(gameList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getGameByIdController = async (req: Request, res: Response) => {
  const gameId = parseInt(req.params.id, 10);

  try {
    const game = await getGameById(gameId);

    if (game) {
      res.json(game);
    } else {
      res.status(404).json({ error: "Game not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateGameController = async (req: Request, res: Response) => {
  const gameId = parseInt(req.params.id, 10);
  const updatedGame = req.body as IGame;

  try {
    await updateGame(gameId, updatedGame);
    res.json({ message: "Game updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteGameController = async (req: Request, res: Response) => {
  const gameId = parseInt(req.params.id, 10);

  try {
    await deleteGame(gameId);
    res.json({ message: "Game deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};