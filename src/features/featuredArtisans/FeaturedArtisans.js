import React, { useState } from "react";
import { useGetAllArtisansQuery } from "../api/apiSlice";
import {
  Typography,
  Container,
  Card,
  CardHeader,
  IconButton,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  Stack,
  Rating,
  Divider,
} from "@mui/material";

import {
  FacebookOutlined,
  Twitter,
  Instagram,
  PhoneOutlined,
  MoreVert,
  ArrowForwardOutlined,
} from "@mui/icons-material";
import "./style.css";
import { Link } from "react-router-dom";

const FeaturedArtisans = () => {

  const { data: artisans, isLoading, isSuccess } = useGetAllArtisansQuery();

  let content;
  if (isLoading) {
    content = <Typography align="center">Loading...</Typography>;
  }

  if (isSuccess) {
    const sortedArtisan = artisans
      .slice()
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5);
    console.log(sortedArtisan);

    content = sortedArtisan.map((artisan) => {
      return (
        <Card
          key={artisan.id}
          sx={{
            height: 450,
          }}
        >
          <CardHeader
            title={artisan.profession}
            subheader={
              <Rating
                precision={0.5}
                name="rating"
                value={artisan.rating}
                readOnly
                size="medium"
              />
            }
            action={
              <Link>
                <IconButton aria-label="settings">
                  <ArrowForwardOutlined />
                </IconButton>
              </Link>
            }
            sx={{
              fontWeight: "900",
              background: "#D7C1CE",
              color: "#000729",
            }}
          />

          <CardMedia
            component="img"
            height="100"
            image={artisan.profileImage}
            alt="Paella dish"
          />

          <CardContent>
            <Divider textAlign="center">Info</Divider>
            <Typography variant="body2" align="left" mb={2}>
              Business Name: {artisan.username}
            </Typography>
            <Divider textAlign="center">summary</Divider>
            <Typography variant="body2" align="left" mb={2}>
              {artisan.about.substring(0, 150)}...
            </Typography>
            <Divider textAlign="center">Address</Divider>
            <Typography variant="body2">{artisan.address}</Typography>
          </CardContent>

          <CardActions>
          </CardActions>
        </Card>
      );
    });
  }

  return (
    <Container
      sx={{
        padding: "0",
        paddingTop: "1rem",
        paddingBottom: "2rem",
        margin: "0",
        maxWidth: "unset !important",
        background: "#000729",
      }}
    >
      <Typography
        align="center"
        variant="h4"
        sx={{ marginBottom: "1rem", color: "#D7C1CE" }}
      >
        Featured Artisans
      </Typography>
      <Stack
        sx={{
          margin: "0 auto",
          width: { xs: "85%", sm: "60%", md: "100%" },
          maxWidth: 1500,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
          alignItems: "stretch",
        }}
      >
        {content}
      </Stack>
    </Container>
  );
};

export default FeaturedArtisans;
