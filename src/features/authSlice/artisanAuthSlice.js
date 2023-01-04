import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: true,
  userCredentials: {
    user: "Moshood Olawale",
    token: 1234567890,
    role: "artisan",
    email: "moh@gmail.com",
  },
};

const artisanAuthSlice = createSlice({
  name: "artisanAuthSlice",
  initialState,
  reducers: {},
});

export const selectLoggedInStatus = (state) => state.artisanAuthSlice.isLoggedIn;
export const selectArtisanCredentials = (state) => state.artisanAuthSlice.userCredentials;

export default artisanAuthSlice.reducer;


