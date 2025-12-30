import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  esp: [
    {
      name: "Bat Lamp",
      ip: "192.168.1.4",
      url: "http://192.168.1.4/",
    }, {
      name: "TV Stand and Bookshelf",
      ip: "192.168.1.5",
      url: "http://192.168.1.5/",
    }
  ]
};

export const connectionSlice = createSlice({
  name: "connection",
  initialState,
  reducers: {
    setEspIp: (state, action) => {
      state.esp[action.payload.id].ip = action.payload.espIp;
      state.esp[action.payload.id].url = `http://${action.payload.espIp}/`;
    }
  },
});

export const { setEspIp } = connectionSlice.actions;
export default connectionSlice.reducer;
