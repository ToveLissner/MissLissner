import { createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { getBalance, loginUser } from "../../services/userService";
import { RootState } from "../store";
import { Dispatch } from "redux";
import { User, UserAllInfo } from "../../models/User";

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
}): ThunkAction<void, RootState, unknown, PayloadAction<User>> => {
  return async (dispatch: Dispatch) => {
    try {
      const user = await loginUser(payload.username, payload.password);
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
      const balance = await getBalance(userID);
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
      return {
        ...state,
        data: {
          ...state.data,
          balance: action.payload,
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
