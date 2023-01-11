import React from "react";
import { Box, Grid, Typography } from "@mui/material";

const Comment = ({ comments }) => {
  return (
    <Box
      sx={{
        width: "100%",
      }}
      p={2}
    >
      <>
        {comments.map((com) => {
          const { id, text, date, user } = com;
          return (
            <Box key={id} mb={3} sx={{ borderBottom: "solid 1px " }}>
              <Grid
                container
                columns={{ xs: 4 }}
                sx={{ justifyContent: "space-between" }}
              >
                <Grid>
                  <Typography align="left" sx={{ textTransform: "capitalize" }}>
                    {user}
                  </Typography>
                </Grid>
                <Grid>
                  <Typography align="right" sx={{ fontSize: 13 }}>
                    {date}
                  </Typography>
                </Grid>
              </Grid>
              <Typography align="left" sx={{ fontSize: 15 }}>
                {text}
              </Typography>
            </Box>
          );
        })}
      </>
    </Box>
  );
};

export default Comment;
