import { createSlice } from "@reduxjs/toolkit";
import { json } from "react-router-dom";

const initialState = {
  isLoggedIn: false,
  userCredentials: {
    username: null,
    token: null,
    role: null,
    email: null,
    id: null,
    name: null,
  },
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUserCredentials: (state, action) => {
      state.isLoggedIn = true;
      state.userCredentials.token = action.payload?.token;
      state.userCredentials.role = action.payload?.role;
      state.userCredentials.id = action.payload?.id;
      state.userCredentials.username = action.payload?.username;
      state.userCredentials.email = action.payload?.email;
      state.userCredentials.name = action.payload?.name;
      localStorage.setItem("login data", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.userCredentials.token = null;
      state.userCredentials.role = null;
      state.userCredentials.id = null;
      state.userCredentials.username = null;
      state.userCredentials.email = null;
      localStorage.removeItem("login data");
    },
  },
});

export const { setUserCredentials, logout } = authSlice.actions;

export const selectLoggedInStatus = (state) => state.authSlice.isLoggedIn;
export const selectUserCredentials = (state) => state.authSlice.userCredentials;

export default authSlice.reducer;
