import { createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import {
  getBalanceService,
  loginUserService,
} from "../../services/userService";
import { RootState } from "../store";
import { Dispatch } from "redux";
import { UserAllInfo } from "../../models/User";

type UserState = {
  data: UserAllInfo;
  loading: boolean;
  error: string | null;
};

const initialState: UserState = {
  data: {
    user: {
      userID: 0,
      username: "",
      password: "",
    },
    gameAccount: {
      balance: 0,
    },
    isLoggedIn: false,
  },
  loading: false,
  error: null,
};

export const logInAsync = (payload: {
  username: string;
  password: string;
}): ThunkAction<void, RootState, unknown, PayloadAction<UserAllInfo>> => {
  return async (dispatch: Dispatch) => {
    try {
      const user = await loginUserService(payload.username, payload.password);
      dispatch(logIn(user));
    } catch (error) {
      console.error("Failed to log in:", error);
    }
  };
};

export const getBalanceAsync = (
  userID: number
): ThunkAction<void, RootState, unknown, PayloadAction<number>> => {
  return async (dispatch: Dispatch) => {
    try {
      const balance = await getBalanceService(userID);
      dispatch(setBalance(balance));
    } catch (error) {
      console.error("Failed to get balance:", error);
    }
  };
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<UserAllInfo>) => {
      return {
        ...state,
        data: action.payload,
        isLoggedIn: true,
        loading: false,
        error: null,
      };
    },
    setBalance: (state, action: PayloadAction<number>) => {
      console.log("Dispatching setBalance action with value:", action.payload);
      return {
        ...state,
        data: {
          ...state.data,
          gameAccount: {
            ...state.data.gameAccount,
            balance: action.payload,
          },
        },
        loading: false,
        error: null,
      };
    },

    logOut: (state) => {
      return { ...state, data: initialState.data, isLoggedIn: false };
    },
  },
});

export const { logIn, logOut, setBalance } = userSlice.actions;

export default userSlice.reducer;
