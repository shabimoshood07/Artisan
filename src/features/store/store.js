import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import authSlice from "../authSlice/authSlice";
import userAuthSlice from "../authSlice/userAuthSlice";
import SearchSlice from "../Search/SearchSlice";
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    authSlice: authSlice,
    userAuthSlice: userAuthSlice,
    searchSlice: SearchSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
