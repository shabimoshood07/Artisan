import React, { useEffect } from "react";
import { useGetAllArtisansQuery } from "../api/apiSlice";
import { selectUserId } from "../authSlice/authSlice";
import {
  Typography,
  Container,
  Card,
  CardHeader,
  IconButton,
  CardMedia,
  CardContent,
  CardActions,
  Stack,
  Rating,
  Divider,
  Box,
  CircularProgress,
} from "@mui/material";

import { ArrowForwardOutlined } from "@mui/icons-material";
import "./style.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFeaturedArtisansQuery } from "../api/apiSlice";
const FeaturedArtisans = () => {
  const {
    data: artisans,
    isLoading,
    isSuccess,
    refetch,
  } = useFeaturedArtisansQuery();
  useEffect(() => {
    refetch();
  }, []);

  const id = useSelector(selectUserId);

  let content;
  if (isLoading) {
    content = (
      <Box
        sx={{
          gridColumnStart: "1",
          gridColumnEnd: { xs: "unset", sm: "4", md: "5" },
          display: "flex",
          justifyContent: "center",
          width: "80%",
          margin: "0 auto",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isSuccess) {
    // const sortedArtisan = [...artisans]
    //   .sort((a, b) => Number(b.rating) - Number(a.rating))
    //   .slice(0, 5);

    content = artisans.map((artisan) => {
      return (
        <Card
          key={artisan._id}
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
                value={Number(artisan.rating)}
                readOnly
                size="medium"
              />
            }
            action={
              <Link
                to={
                  artisan._id == id
                    ? `/profile/${artisan._id}`
                    : `/details/${artisan._id}`
                }
              >
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
              Business Name: {artisan.businessName}
            </Typography>
            <Divider textAlign="center">summary</Divider>
            <Typography variant="body2" align="left" mb={2}>
              {artisan.about.substring(0, 150)}...
            </Typography>
            <Divider textAlign="center">Address</Divider>
            <Typography variant="body2">{artisan.address}</Typography>
          </CardContent>

          <CardActions></CardActions>
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
