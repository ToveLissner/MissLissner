import {
  createSlice,
  Dispatch,
  PayloadAction,
  ThunkAction,
} from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getAllGamesByUserIdService } from "../../services/gameService";
import { Game } from "../../models/Game";

type GameState = { games: Game[]; loading: boolean; error: string | null };

const initialState: GameState = {
  games: [{ gameID: 0, price: 0, purchaseDate: "", gameTypeID: 0, userID: 0 }],
  loading: false,
  error: null,
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
  },
});

export const { setGames } = gameSlice.actions;

export default gameSlice.reducer;
