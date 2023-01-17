import React from "react";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

// API SLICE
import {
  useLikeCommentMutation,
  useUnlikeCommentMutation,
} from "../api/apiSlice";
// AUTH SLICE
import { selectUserCredentials } from "../authSlice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllArtisansQuery } from "../api/apiSlice";
const Comment = (comments) => {
  const dispatch = useDispatch();
  console.log(comments);
  const {
    username,
    token,
    role,
    email,
    id: userId,
    name,
  } = useSelector(selectUserCredentials);
  const [likeComment, { isLoading, isError }] =
    useLikeCommentMutation("getArtisans");

  const [unlikeComment, { isLoading: isLodaingUnlike }] =
    useUnlikeCommentMutation("getArtisans");

  // handle like comment
  const handleLikeComment = async (commentId, userId) => {
    const data = await likeComment({ commentId, userId });
  };

  // handle unlike comment
  const handleUnlikeComment = async (commentId, userId) => {
    const data = await unlikeComment({ commentId, userId });
  };

  return (
    <Box
      sx={{
        width: "100%",
      }}
      p={2}
    >
      <>
        {comments.comments.map((com) => {
          const {
            _id,
            commentId,
            commentText,
            createdAt,
            createdBy,
            likesCount,
            likes,
          } = com;

          return (
            <Box key={_id} mb={3} sx={{ borderBottom: "solid 1px " }}>
              <Grid
                container
                columns={{ xs: 4 }}
                sx={{ justifyContent: "space-between" }}
              >
                <Grid>
                  <Typography align="left" sx={{ textTransform: "capitalize" }}>
                    {createdBy}
                  </Typography>
                </Grid>
                <Grid>
                  <Typography align="right" sx={{ fontSize: 13 }}>
                    {createdAt}
                  </Typography>
                </Grid>
              </Grid>
              <Typography align="left" sx={{ fontSize: 15 }}>
                {commentText}
              </Typography>
              <Box
                sx={{
                  // border: "solid",
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <IconButton
                  onClick={() => {
                    if (likes.includes(userId)) {
                      handleUnlikeComment(commentId, userId);
                    } else {
                      handleLikeComment(commentId, userId);
                    }
                  }}
                  disabled={isLoading || isLodaingUnlike}
                >
                  {likes.includes(userId) ? (
                    <FavoriteIcon sx={{ color: "red" }} />
                  ) : (
                    <FavoriteIcon />
                  )}
                </IconButton>
                <Typography>{likesCount}</Typography>
              </Box>
            </Box>
          );
        })}
      </>
    </Box>
  );
};

export default Comment;
