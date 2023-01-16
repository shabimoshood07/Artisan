import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const apiAuthSlice = createApi({
  reducerPath: "apiAuth",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authSlice.userCredentials.token;
      if (token) {
          headers.set("authorization", `Bearer ${token}`);
        }
        console.log(token);
      return headers;
    },
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useLoginMutation } = apiAuthSlice;
