import React from "react";
import { Box } from "@mui/material";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
const Comment = ({ comments }) => {
  return (
    <Box
      sx={{
        width: "100%",
      }}
      p={2}
    >
      <>
      <CommentForm/>
        {comments.map((comment) => {
          return <CommentList key={comment._id} comment={comment} />;
        })}
      </>
    </Box>
  );
};

export default Comment;
