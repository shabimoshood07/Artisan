import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userCredentials: {
    username: null,
    token: null,
    role: null,
  },
};

const userAuthSlice = createSlice({
    name:"userAuthSlice",
    initialState,
    reducers:{

    }
})


export const selectLoggedInStatus = (state) => state.userAuthSlice.isLoggedIn;
export const selectUserCredentials = (state) => state.userAuthSlice.userCredentials;

export default userAuthSlice.reducer;