import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: true,
  userCredentials: { user: null, token: null, role: "artisan", email: null },
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
});

export const selectLoggedInStatus = (state) => state.authSlice.isLoggedIn;
export const selectUserCredentials = (state) => state.authSlice.userCredentials;

export default authSlice.reducer;

<label>
  <input type="radio" id="indoor" /> Indoor
</label>;
