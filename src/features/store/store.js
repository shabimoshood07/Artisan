import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import authSlice from "../authSlice/authSlice";
import userAuthSlice from "../authSlice/userAuthSlice";
import SearchSlice from "../Search/SearchSlice";
import toggleSlice from "../ArtisanDetails/toggleSlice";
import { apiAuthSlice } from "../api/apiAuthSlice";
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [apiAuthSlice.reducerPath]: apiAuthSlice.reducer,
    authSlice: authSlice,
    userAuthSlice: userAuthSlice,
    searchSlice: SearchSlice,
    toggleSlice: toggleSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, apiAuthSlice.middleware),
});
