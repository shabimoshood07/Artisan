import React from "react";
import { Box, Typography } from "@mui/material";
import CommentForm from "../CommentForm/CommentForm";
import CommentList from "./CommentList";
import { useGetAllCommentsQuery } from "../api/apiSlice";
import { useParams } from "react-router-dom";

const Comment = () => {
  const { id: artisanId } = useParams();
  const { data, isLoading, isSuccess } = useGetAllCommentsQuery(artisanId);

  let content;

  if (isLoading) {
    content = <Typography>Loading...</Typography>;
  }
  if (isSuccess) {
    const { comments } = data;

    // Sort comment by date posted
    const sortedComment = [...comments].sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    content = (
      <Box
        sx={{
          width: "100%",
        }}
        p={2}
      >
        {sortedComment.map((comment) => {
          return <CommentList key={comment._id} comment={comment} />;
        })}
      </Box>
    );
  }
  return (
    <>
      <CommentForm />
      {content}
    </>
  );
};

export default Comment;
