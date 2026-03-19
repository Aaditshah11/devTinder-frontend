import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connection",
  initialState: [],
  reducers: {
    addConnections: (state, action) => action.payload,
    removeConnections: (state, action) => state.filter((user) => user._id !== action.payload._id),
  },
});

export const { addConnections, removeConnections } = connectionSlice.actions;

export default connectionSlice.reducer;