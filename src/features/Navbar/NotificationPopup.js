import { Box, MenuItem, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useGetArtisanQuery } from "../api/apiSlice";
import { selectUserId } from "../authSlice/authSlice";
import { formatDistance, format } from "date-fns";
import { useEffect } from "react";

// CSS
import "./style.css";
const NotificationPopup = () => {
  const artisanId = useSelector(selectUserId);
  const { data, isSuccess, isLoading, refetch } = useGetArtisanQuery(artisanId);

  useEffect(() => {
    refetch();
  }, []);
  let content;

  if (isSuccess) {
    const unreadComment = data.comments.filter(
      (comment) => comment.read == false
    );

    // Sort comment by date posted
    const sortedComment = [...unreadComment].sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    content = sortedComment.map((comment) => {
      const { commentId, commentText, createdAt, createdBy, _id } = comment;
      let backendDate = createdAt
        .split(":")[0]
        .slice(0, -3)
        .split("-")
        .join(",");
      const dateFromComment = formatDistance(new Date(backendDate), new Date());

      return (
        <MenuItem
          key={_id}
          sx={{ flexDirection: "column", borderBottom: "solid 1px" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography sx={{ fontSize: "10px" }}>
              Review from {createdBy}
            </Typography>
            <Typography sx={{ fontSize: "10px" }}>
              {dateFromComment} ago
            </Typography>
          </Box>
          <Typography
            sx={{
              // border: "solid",
              width: "100%",
              textTransform: "capitalize",
            }}
          >
            {commentText.substring(0, 20)}
          </Typography>
        </MenuItem>
      );
    });
  }

  if (isLoading) {
    content = <Typography>Loading....</Typography>;
  }

  return content;
};

export default NotificationPopup;
