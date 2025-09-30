import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    copiedColor: ""
};

export const colorSlice = createSlice({
    name: "color",
    initialState,
    reducers: {
        setCopiedColor: (state, action) => {
            state.copiedColor = action.payload.copiedColor;
        }
    },
});

export const { setCopiedColor } = colorSlice.actions;
export default colorSlice.reducer;
