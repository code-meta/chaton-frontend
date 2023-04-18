import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connections: [],
};

const connectionsSlice = createSlice({
  name: "connections",
  initialState,
  reducers: {
    setConnections: (state, action) => {
      state.connections = action.payload;
    },
  },
});

export const { setConnections } = connectionsSlice.actions;

export default connectionsSlice.reducer;