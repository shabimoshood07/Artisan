import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3600",
  }),
  tagTypes: ['Artisans'],
  endpoints: (builder) => ({
    getAllArtisans: builder.query({
      query: () => "/artisans",
      providesTags: ['Artisans']
    }),
  }),
});

export const { useGetAllArtisansQuery } = apiSlice;
