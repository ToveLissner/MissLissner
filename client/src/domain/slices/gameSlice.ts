import {
  createSlice,
  Dispatch,
  PayloadAction,
  ThunkAction,
} from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  createGameService,
  getAllGamesByUserIdService,
} from "../../services/gameService";
import { Game } from "../../models/Game";

type GameState = { games: Game[]; loading: boolean; error: string | null };

const initialState: GameState = {
  games: [],
  loading: false,
  error: null,
};

export const createGameAsync = (
  game: Game
): ThunkAction<void, RootState, unknown, PayloadAction<Game>> => {
  return async (dispatch: Dispatch) => {
    try {
      const newGame = await createGameService(game);

      dispatch(addGame(newGame));
    } catch (error) {
      console.error("Failed to create game:", error);
    }
  };
};

export const getGamesByUserIdAsync = (
  userID: number
): ThunkAction<void, RootState, unknown, PayloadAction<number>> => {
  return async (dispatch: Dispatch) => {
    try {
      const games = await getAllGamesByUserIdService(userID);
      dispatch(setGames(games));
    } catch (error) {
      console.error("Failed to get games:", error);
    }
  };
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGames: (state, action: PayloadAction<Game[]>) => {
      return {
        ...state,
        games: action.payload,
        loading: false,
        error: null,
      };
    },

    addGame: (state, action: PayloadAction<Game>) => {
      const existingGameIndex = state.games.findIndex(
        (game) => game.gameID === action.payload.gameID
      );

      if (existingGameIndex === -1) {
        return {
          ...state,
          games: [...state.games, { ...action.payload }],
          loading: false,
          error: null,
        };
      } else {
        const updatedGames = [...state.games];
        updatedGames[existingGameIndex] = { ...action.payload };

        return {
          ...state,
          games: updatedGames,
          loading: false,
          error: null,
        };
      }
    },
  },
});

export const { setGames, addGame } = gameSlice.actions;

export default gameSlice.reducer;
