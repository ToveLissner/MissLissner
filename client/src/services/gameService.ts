import axios from "axios";
import { GameType } from "../models/GameType";
import { Game } from "../models/Game";

const API_BASE_URL = "http://localhost:4440";

export const getAllGameTypesService = async (): Promise<GameType[]> => {
  try {
    const response = await axios.get<GameType[]>(`${API_BASE_URL}/game-types`);

    return response.data;
  } catch (error) {
    console.error("Error fetching game types:", error);
    throw error;
  }
};

export const getGameTypeByIdService = async (
  gameTypeId: number
): Promise<GameType> => {
  try {
    const response = await axios.get<GameType>(
      `${API_BASE_URL}/game-types/${gameTypeId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching game type:", error);
    throw error;
  }
};

export const createGameService = async (gameData: Game): Promise<Game> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/games`, gameData);

    if (response.data.message === "Game created successfully") {
      const createdGame = response.data.game;
      return createdGame;
    } else {
      console.error("Failed to create game:", response.data);
      throw new Error("Failed to create game");
    }
  } catch (error) {
    console.error("Failed to create game:", error);
    throw error;
  }
};

export const getAllGamesByUserIdService = async (
  userId: number
): Promise<Game[]> => {
  try {
    const response = await axios.get<Game[]>(
      `${API_BASE_URL}/games/user/${userId}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching games by user ID:", error);
    throw error;
  }
};

export const getGameByIdService = async (gameId: number): Promise<Game> => {
  try {
    const response = await axios.get<Game>(`${API_BASE_URL}/games/${gameId}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching game by ID:", error);
    throw error;
  }
};
