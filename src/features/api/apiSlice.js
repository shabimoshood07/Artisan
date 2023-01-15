import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
  }),
  tagTypes: ["Artisans", "Users"],
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
  }),
});


// export const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:3600",
//   }),
//   tagTypes: ["Artisans", "Users"],
//   endpoints: (builder) => ({
//     getAllArtisans: builder.query({
//       query: () => "/artisans",
//       providesTags: ["Artisans"],
//     }),
//     getArtisan: builder.query({
//       query: (id) => `/artisans/${id}`,
//       providesTags: ["Artisans"],
//     }),
//     getAllUsers: builder.query({
//       query: () => "/users",
//       providesTags: ["Users"],
//     }),
//   }),
// });

export const {
  useGetAllArtisansQuery,
  useGetAllUsersQuery,
  useGetArtisanQuery,
} = apiSlice;
