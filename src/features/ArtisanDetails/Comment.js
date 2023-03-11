import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import CommentForm from "../CommentForm/CommentForm";
import CommentList from "./CommentList";
import { useGetAllCommentsQuery } from "../api/apiSlice";
import { useParams } from "react-router-dom";

const Comment = () => {
  const { id: artisanId } = useParams();
  const { data, isLoading, isSuccess } = useGetAllCommentsQuery(artisanId);

  const [commentChunk, setCommentChunk] = useState(10);
  const [showmoreBtn, setShowMoreBtn] = useState(true);

  useEffect(() => {
    if (data && commentChunk >= data.comments.length) {
      setShowMoreBtn(false);
    }
  }, [commentChunk]);

  const handleShowMore = () => {
    setCommentChunk(commentChunk + 10);
  };

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
        {sortedComment.slice(0, commentChunk).map((comment) => {
          return <CommentList key={comment._id} comment={comment} />;
        })}
      </Box>
    );
  }
  return (
    <>
      <CommentForm />
      {content}
      {showmoreBtn && data && (
        <Button
          fullWidth
          sx={{
            backgroundColor: "#d32f2f",
            color: "#d7c1ce",
            transition: "all 0.5s",
            fontSize: "20px",
            "&:hover": {
              background: "#000729",
            },
          }}
          onClick={handleShowMore}
        >
          Show more
        </Button>
      )}
    </>
  );
};

export default Comment;
