import { createSlice } from "@reduxjs/toolkit";

const initialState = { access: "", refresh: "" };

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
    },
  },
});

export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;
