import React from "react";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
// API SLICE
import {
  useLikeCommentMutation,
  useUnlikeCommentMutation,
} from "../api/apiSlice";
// AUTH SLICE
import { selectUserId } from "../authSlice/authSlice";
import { useDispatch, useSelector } from "react-redux";

let CommentList = ({ comment }) => {
  const {
    _id,
    commentId,
    commentText,
    createdAt,
    createdBy,
    likesCount,
    likes,
  } = comment;

  const dispatch = useDispatch();

  const userId = useSelector(selectUserId);

  const [likeComment, { isLoading, isError }] = useLikeCommentMutation();

  const [unlikeComment, { isLoading: isLodaingUnlike }] =
    useUnlikeCommentMutation();

  // handle like comment
  const handleLikeComment = async (commentId, userId) => {
    const data = await likeComment({ commentId, userId });
  };

  // handle unlike comment
  const handleUnlikeComment = async (commentId, userId) => {
    const data = await unlikeComment({ commentId, userId });
  };

  return (
    <Box mb={3} sx={{ borderBottom: "solid 1px " }}>
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
};

CommentList = React.memo(CommentList);
export default CommentList;
