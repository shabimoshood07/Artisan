import { Container, Typography } from "@mui/material";
import React from "react";
import FeaturedArtisans from "../features/featuredArtisans/FeaturedArtisans";
const Login = () => {
  return (
    <Container
      sx={{
        padding: "0 !important",
        margin: "0",
        maxWidth: "unset !important",
      }}
    >
      <Typography>LOGIN</Typography>
      <FeaturedArtisans />
    </Container>
  );
};

export default Login;
