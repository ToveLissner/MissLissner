import axios from "axios";
import { GameType } from "../models/GameType";

const API_BASE_URL = "http://localhost:4440";

const getAllGameTypes = async (): Promise<GameType[]> => {
  try {
    const response = await axios.get<GameType[]>(`${API_BASE_URL}/game-types`);

    console.log("Response from login API call:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching game types:", error);
    throw error;
  }
};

export { getAllGameTypes };

// import { Game } from "../models/Game";
// import { GameAccount } from "../models/GameAccount";
