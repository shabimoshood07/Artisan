import { Button, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import FeaturedArtisans from "../features/featuredArtisans/FeaturedArtisans";
import LoginForm from "../features/LoginForm/LoginForm";
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
      <LoginForm />
      <FeaturedArtisans />
    </Container>
  );
};

export default Login;
