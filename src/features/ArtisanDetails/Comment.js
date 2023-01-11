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
          const { id, text, date } = com;
          return (
            <Box key={id} sx={{border:"solid"}}>
              <Grid >
                <Typography align="left" sx={{ fontSize: 15 }}>
                  {text}
                </Typography>
                <Typography>{date}</Typography>
              </Grid>
            </Box>
          );
        })}
      </>
    </Box>
  );
};

export default Comment;
