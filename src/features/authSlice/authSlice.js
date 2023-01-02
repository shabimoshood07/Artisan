import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userCredentials: {},
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
});

export const selectLoggedInStatus = (state) => state.authSlice.isLoggedIn;
export const selectUserCredentials = (state) => state.authSlice.userCredentials;

export default authSlice.reducer;
