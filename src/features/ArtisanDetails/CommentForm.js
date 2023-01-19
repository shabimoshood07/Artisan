import { TextField, Box } from "@mui/material";

import React from "react";

const CommentForm = () => {
  return (
    <Box
      component="form"
      autoComplete="off"
      sx={{ border: "solid 1px", my: 2, py: 2 }}
    >
      <TextField
        id="outlined-helperText"
        label="Comment"
        variant="outlined"
        required
        helperText="Not more than 500 words"
      />
    </Box>
  );
};

export default CommentForm;
