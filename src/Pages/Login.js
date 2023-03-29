import { Button, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FeaturedArtisans from "../features/featuredArtisans/FeaturedArtisans";
import LoginForm from "../features/LoginForm/LoginForm";
import { selectLoggedInStatus } from "../features/authSlice/authSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = () => {
  const loggedInStatus = useSelector(selectLoggedInStatus);
  const navigate = useNavigate();
  useEffect(() => {
    if (loggedInStatus) {
      navigate("/");
    }
  }, []);
  return (
    <Container
      sx={{
        padding: "0 !important",
        margin: "0",
        maxWidth: "unset !important",
      }}
    >
      <LoginForm />
      <FeaturedArtisans />
    </Container>
  );
};

export default Login;
