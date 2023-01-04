import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import artisanAuthSlice from "../authSlice/artisanAuthSlice";
import userAuthSlice from "../authSlice/userAuthSlice";
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    artisanAuthSlice: artisanAuthSlice,
    userAuthSlice: userAuthSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
