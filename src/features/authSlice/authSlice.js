import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userCredentials: {
    username: "moshood",
    token: 1234567890,
    role: "artisan",
    email: "yaz@gamil.com",
    id: null,
    name: null,
  },
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUserCredentials:(state, action)=>{

    }
  },
});

export const selectLoggedInStatus = (state) => state.authSlice.isLoggedIn;
export const selectUserCredentials = (state) => state.authSlice.userCredentials;

export default authSlice.reducer;
