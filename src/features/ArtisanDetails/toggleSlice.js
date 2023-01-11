import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

const toggleSlice = createSlice({
  name: "toggleSlice",
  initialState,
  reducers: {
    toggle: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { toggle } = toggleSlice.actions;
export const selectToggleValue = (state) => state.toggleSlice.value;
export default toggleSlice.reducer;
