import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: true,
  userCredentials: {
    username: null,
    token: null,
    role: "user",
  },
};

const userAuthSlice = createSlice({
  name: "userAuthSlice",
  initialState,
  reducers: {},
});

export const selectLoggedInStatus = (state) => state.userAuthSlice.isLoggedIn;
export const selectUserCredentials = (state) =>
  state.userAuthSlice.userCredentials;

export default userAuthSlice.reducer;
