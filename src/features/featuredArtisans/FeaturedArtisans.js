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
  // Rating

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
            maxWidth: 310,
            minWidth: 310,
            minHeight: 320,
            maxHeight: 500,
            flex: 1,
          }}
        >
          <CardHeader
            // avatar={
            //   <Avatar
            //     src={artisan.profileImage}
            //     sx={{ width: 56, height: 56 }}
            //   />
            // }
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
            {/* <a
            href={`https://facebook.com/${artisan.socials.facebook}`}
            target="_blank"
          >
            <IconButton aria-label="add to favorites">
              <FacebookOutlined />
            </IconButton>
          </a>
          <a
            href={`https://instagram.com/${artisan.socials.instagram}`}
            target="_blank"
          >
            <IconButton aria-label="share">
              <Instagram />
            </IconButton>
          </a>
          <a
            href={`https://twitter.com/${artisan.socials.twitter}`}
            target="_blank"
          >
            <IconButton aria-label="more">
              <Twitter />
            </IconButton>
          </a>
          <a
            href={`https://twitter.com/${artisan.phoneNumber}`}
            target="_blank"
          >
            <IconButton aria-label="more">
              <PhoneOutlined />
            </IconButton>
          </a> */}
          </CardActions>
        </Card>
      );
    });
  }

  return (
    <Container
      //   maxWidth="lg"
      sx={{
        // border: "solid green",
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
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        // justifyContent="space-evenly"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
        }}
        className="stack"
      >
        {content}
      </Stack>
    </Container>
  );
};

export default FeaturedArtisans;
