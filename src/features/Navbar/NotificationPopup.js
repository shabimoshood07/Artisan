import { Box, MenuItem, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useGetArtisanQuery } from "../api/apiSlice";
import { selectUserId } from "../authSlice/authSlice";
import { formatDistance, format } from "date-fns";
const NotificationPopup = () => {
  const artisanId = useSelector(selectUserId);
  const { data, isSuccess, isLoading } = useGetArtisanQuery(artisanId);
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
        // <Box key={_id}>
        <MenuItem
          key={_id}
          sx={{ flexDirection: "column", borderBottom: "solid 1px" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              //   border: "solid",
              width: "100%",
            }}
          >
            <Typography sx={{ fontSize: "10px" }}>
              Review by {createdBy}
            </Typography>
            <Typography sx={{ fontSize: "10px" }}> {dateFromComment}</Typography>
          </Box>
          <Typography>{commentText.substring(0, 20)}</Typography>
        </MenuItem>
        // </Box>
      );
    });
  }

  if (isLoading) {
    content = <Typography>Loading....</Typography>;
  }

  return content;
};

export default NotificationPopup;
