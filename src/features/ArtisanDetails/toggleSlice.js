import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "info",
};

const toggleSlice = createSlice({
  name: "toggleSlice",
  initialState,
  reducers: {},
});

export default toggleSlice.reducer;
