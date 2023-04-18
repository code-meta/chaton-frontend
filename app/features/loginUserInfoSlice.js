import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
};

const loginUserInfoSlice = createSlice({
  name: "loginUserInfo",
  initialState,
  reducers: {
    setValue: (state, action) => {
      switch (action.payload.type) {
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

export const { setValue } = loginUserInfoSlice.actions;

export default loginUserInfoSlice.reducer;
