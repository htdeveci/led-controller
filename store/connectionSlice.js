import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  serverUrl: "http://192.168.1.4/",
  serverIP: "192.168.1.4",
};

export const connectionSlice = createSlice({
  name: "connection",
  initialState,
  reducers: {
    setServerIP: (state, action) => {
      console.log(action.payload.serverIP);
      state.serverIP = action.payload.serverIP;
      state.serverUrl = `http://${action.payload.serverIP}/`;
    },
  },
});

export const { setServerIP } = connectionSlice.actions;
export default connectionSlice.reducer;
