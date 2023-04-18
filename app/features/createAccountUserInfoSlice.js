import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  email: "",
  password: "",
};

const createAccountUserInfoSlice = createSlice({
  name: "createAccountUserInfo",
  initialState,
  reducers: {
    setValue: (state, action) => {
      switch (action.payload.type) {
        case "username":
          state.username = action.payload.data;
          break;
        case "email":
          state.email = action.payload.data;
          break;
        case "password":
          state.password = action.payload.data;
          break;
        default:
          console.log("cool");
          break;
      }
    },
  },
});

export const { setValue } = createAccountUserInfoSlice.actions;

export default createAccountUserInfoSlice.reducer;
