import { createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { loginUser } from "../../services/userService";
import { RootState } from "../store";
import { Dispatch } from "redux";

type User = {
  username: string;
  password: string;
  balance: number;
  isLoggedIn: boolean;
};

type UserState = {
  data: User;
  loading: boolean;
  error: string | null;
};

const initialState: UserState = {
  data: {
    username: "",
    password: "",
    balance: 0,
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
      // Handle error if needed
    }
  };
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<User>) => {
      return {
        ...state,
        data: action.payload,
        isLoggedIn: true,
        loading: false,
        error: null,
      };
    },
    logOut: (state) => {
      return { ...state, data: initialState.data, isLoggedIn: false };
    },
  },
});

export const { logIn, logOut } = userSlice.actions;

export default userSlice.reducer;
