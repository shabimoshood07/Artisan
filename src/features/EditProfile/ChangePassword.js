import { Box, Button, TextField } from "@mui/material";
import React from "react";

const ChangePassword = () => {
  return (
    <Box component="form">
      <TextField fullWidth margin="normal" label="old password" />
      <TextField fullWidth margin="normal" label="new password" />
      <TextField fullWidth margin="normal" label="confirm password" />
      <Button className="btn">Submit</Button>
    </Box>
  );
};

export default ChangePassword;
