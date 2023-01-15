import React from "react";
import { Box, Grid, Typography } from "@mui/material";

const Comment = (comments) => {
  console.log(comments);

  return (
    <Box
      sx={{
        width: "100%",
      }}
      p={2}
    >
      <>
        {comments.comments.map((com) => {
          const { _id, commentText, createdAt, createdBy } = com;
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
            </Box>
          );
        })}
      </>
    </Box>
  );
};

export default Comment;
