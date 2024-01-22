import { Request, Response } from "express";
import {
  createGameType,
  getAllGameTypes,
  // getGameTypeByGameType,
  updateGameType,
  deleteGameType,
  getGameTypeByGameTypeId,
} from "../db/db";
import { IGameType } from "../models/IGameType";

export const createGameTypeController = async (req: Request, res: Response) => {
  const newGameType = req.body as IGameType;
  try {
    const gameTypeID = await createGameType(newGameType);
    res.json({
      message: `Game type created successfully with ID: ${gameTypeID}`,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to create game type" });
  }
};

export const getAllGameTypesController = async (
  req: Request,
  res: Response
) => {
  try {
    const gameTypes = await getAllGameTypes();
    res.json(gameTypes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// export const getGameTypeByGameTypeController = async (
//   req: Request,
//   res: Response
// ) => {
//   const gameType = req.params.gameType;

//   try {
//     const retrievedGameType = await getGameTypeByGameType(gameType);

//     if (retrievedGameType) {
//       res.json(retrievedGameType);
//     } else {
//       res.status(404).json({ error: "Game type not found" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

export const getGameTypeByGameTypeIdController = async (
  req: Request,
  res: Response
) => {
  const GameTypeID = parseInt(req.params.id, 10);

  try {
    const retrievedGameType = await getGameTypeByGameTypeId(GameTypeID);

    if (retrievedGameType) {
      res.json(retrievedGameType);
    } else {
      res.status(404).json({ error: "Game type not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateGameTypeController = async (req: Request, res: Response) => {
  const gameType = req.params.gameType;
  const updatedGameType = req.body as IGameType;

  try {
    await updateGameType(gameType, updatedGameType);
    res.json({ message: "Game type updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteGameTypeController = async (req: Request, res: Response) => {
  const gameType = req.params.gameType;

  try {
    await deleteGameType(gameType);
    res.json({ message: "Game type deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
