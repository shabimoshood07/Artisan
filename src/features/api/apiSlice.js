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
  tagTypes: ["Artisans", "Users", "Ratings", "Comments"],
  endpoints: (builder) => ({
    // GET ALL ARTISAN
    getAllArtisans: builder.query({
      query: () => "/artisan",
      // providesTags: ["Artisans"],
    }),
    
    // GET ARTISAN
    getArtisan: builder.query({
      query: (id) => `/artisan/${id}`,
      providesTags: ["Artisans"],
    }),

    // GET ALL USERS
    getAllUsers: builder.query({
      query: () => "/user",
      providesTags: ["Users"],
    }),

    // LOGIN
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),

    // LIKE A COMMENT
    likeComment: builder.mutation({
      query: ({ commentId, userId }) => ({
        url: `/user/like/${commentId}/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Comments"],
    }),

    // UNLIKE COMMENT
    unlikeComment: builder.mutation({
      query: ({ commentId, userId }) => ({
        url: `/user/unlike/${commentId}/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Comments"],
    }),

    // ADD COMMENT
    addComment: builder.mutation({
      query: ({ artisanId, userId, commentText }) => ({
        url: `user/comment/${artisanId}/${userId}`,
        method: "POST",
        body: { commentText },
      }),
      invalidatesTags: ["Comments"],
    }),

    // GET ALL COMMENTS
    getAllComments: builder.query({
      query: (artisanId) => ({
        url: `artisan/comments/${artisanId}`,
        method: "GET",
      }),
      providesTags: ["Comments"],
    }),

    // ADD RATING
    addRating: builder.mutation({
      query: ({ artisanId, userId, ratingValue }) => ({
        url: `user/rating/${artisanId}/${userId}`,
        method: "PATCH",
        body: { ratingValue },
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
  useAddCommentMutation,
  useAddRatingMutation,
  useGetAllCommentsQuery,
} = apiSlice;
