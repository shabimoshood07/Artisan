import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authSlice.userCredentials.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Artisans", "Users", "Auth"],
  endpoints: (builder) => ({
    getAllArtisans: builder.query({
      query: () => "/artisan",
      providesTags: ["Artisans"],
    }),
    getArtisan: builder.query({
      query: (id) => `/artisan/${id}`,
      providesTags: ["Artisans"],
    }),
    getAllUsers: builder.query({
      query: () => "/user",
      providesTags: ["Users"],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const {
  useGetAllArtisansQuery,
  useGetAllUsersQuery,
  useGetArtisanQuery,
  useLoginMutation
} = apiSlice;

