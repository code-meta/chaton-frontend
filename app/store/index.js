import { configureStore } from "@reduxjs/toolkit";
import {
  loginUserInfoSlice,
  createAccountUserInfoSlice,
  userSlice,
  tokenSlice,
  connectionsSlice,
} from "../features/index";

export const store = configureStore({
  reducer: {
    loginUserInfo: loginUserInfoSlice,
    createAccountUserInfo: createAccountUserInfoSlice,
    user: userSlice,
    token: tokenSlice,
    connections: connectionsSlice,
  },
});
