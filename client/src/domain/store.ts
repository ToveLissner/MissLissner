import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import gameReducer from "./slices/gameSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    game: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
