import React from "react";
import { Box, Typography } from "@mui/material";

const About = ({ about }) => {
  return (
    <Box
      sx={{
        width: "100%",
      }}
      p={2}
    >
      <Typography align="left" sx={{ fontSize: 20 }}>
        {about}
      </Typography>
    </Box>
  );
};

export default About;
