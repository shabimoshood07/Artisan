import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userCredentials: {
    user: null,
    userName:"xabi",
    token: 1234567890,
    role: "user",
    email: "moh@gmail.com",
  },
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
});

export const selectLoggedInStatus = (state) => state.authSlice.isLoggedIn;
export const selectUserCredentials = (state) => state.authSlice.userCredentials;

export default authSlice.reducer;


