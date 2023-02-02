import { createSlice, createSelector } from "@reduxjs/toolkit";

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
    setLoggedInStatus: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUserCredentials: (state, action) => {
      // state.isLoggedIn = true;
      state.userCredentials.token = action.payload?.token;
      state.userCredentials.role = action.payload?.role;
      state.userCredentials.id = action.payload?.id;
      state.userCredentials.username = action.payload?.username;
      state.userCredentials.email = action.payload?.email;
      state.userCredentials.name = action.payload?.name;
      localStorage.setItem("login data", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      // state.isLoggedIn = false;
      state.userCredentials.token = null;
      state.userCredentials.role = null;
      state.userCredentials.id = null;
      state.userCredentials.username = null;
      state.userCredentials.email = null;
      localStorage.removeItem("login data");
    },
  },
});

export const { setUserCredentials, logout, setLoggedInStatus } =
  authSlice.actions;

export const selectLoggedInStatus = (state) => state.authSlice.isLoggedIn;
export const selectUsername = (state) =>
  state.authSlice.userCredentials.username;
export const selectUserRole = (state) => state.authSlice.userCredentials.role;
export const selectUserEmail = (state) => state.authSlice.userCredentials.email;
export const selectUserId = (state) => state.authSlice.userCredentials.id;
export const selectName = (state) => state.authSlice.userCredentials.name;
export const selectUsertoken = (state) => state.authSlice.userCredentials.token;

// export const selectUserId = createSelector(
//   [(state) => state.authSlice.userCredentials.id],
//   (state) => state
// );

// export const selectUserCredentials = createSelector(
//   [authSlice.getInitialState],
//   (state) => state.userCredentials
// );

export default authSlice.reducer;
