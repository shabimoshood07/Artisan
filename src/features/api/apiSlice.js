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
    likeComment: builder.mutation({
      query: ({ commentId, userId }) => ({
        url: `/user/like/${commentId}/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Artisans"],
      async onQueryStarted({ commentId, likes }, { dispatch, queryFulfilled }) {
        // `updateQueryData` requires the endpoint name and cache key arguments,
        // so it knows which piece of cache state to update
        const patchResult = dispatch(
          // updateQueryData takes three arguments: the name of the endpoint to update, the same cache key value used to identify the specific cached data, and a callback that updates the cached data.
          apiSlice.util.updateQueryData(
            "getArtisans",
            "getAllArtisans",
            (draft) => {
              // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
              const comments = draft.entities[commentId];
              console.log(comments);
              if (comments) comments.likes = likes;
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    unlikeComment: builder.mutation({
      query: ({ commentId, userId }) => ({
        url: `/user/unlike/${commentId}/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Artisans"],
    }),
  }),
});

export const {
  useGetAllArtisansQuery,
  useGetAllUsersQuery,
  useGetArtisanQuery,
  useLoginMutation,
  useLikeCommentMutation,
  useUnlikeCommentMutation,
} = apiSlice;

// transformResponse: (response, meta, arg) => {
//   console.log(arg);
// },
// async onQueryStarted(
//   { commentId, comment },
//   { dispatch, queryFulfilled }
// ) {
//   // `updateQueryData` requires the endpoint name and cache key arguments,
//   // so it knows which piece of cache state to update
//   const patchResult = dispatch(
//     // updateQueryData takes three arguments: the name of the endpoint to update, the same cache key value used to identify the specific cached data, and a callback that updates the cached data.
//     apiSlice.util.updateQueryData("getAllArtisans", "getArtisans", (draft) => {
//       // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
//       console.log(draft.entities);
//       const artisans = draft.entities[commentId];
//       if (artisans) artisans.comments.commentId = comment;
//     })
//   );
//   try {
//     await queryFulfilled;
//   } catch {
//     patchResult.undo();
//   }
// },

// async onQueryStarted(
//   arg,
//   { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
// ) {
//   console.log(getState());
//   queryFulfilled.then((data) => console.log(data));
// },
