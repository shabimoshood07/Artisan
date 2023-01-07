import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3600",
  }),
  tagTypes: ["Artisans", "Users"],
  endpoints: (builder) => ({
    getAllArtisans: builder.query({
      query: () => "/artisans",
      providesTags: ["Artisans"],
    }),
    getAllUsers: builder.query({
      query: () => "/users",
      providesTags: ["Users"],
    }),
    getSearchedArtisan: builder.query({
      query: (profession, location) =>
        "/artisans?profession_like=" +
        `${profession}` +
        "&address_like=" +
        `${location}`,
    }),
  }),
});

export const {
  useGetAllArtisansQuery,
  useGetAllUsersQuery,
  useGetSearchedArtisanQuery,
} = apiSlice;
