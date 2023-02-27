import {
  CircularProgress,
  Grid,
  Box,
  Avatar,
  Typography,
  Rating,
  Chip,
  Button,
  IconButton,
} from "@mui/material";
import React from "react";
import {
  AiOutlineInstagram,
  AiOutlinePhone,
  AiOutlineTwitter,
} from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useGetArtisanQuery } from "../features/api/apiSlice";
import { selectUserId } from "../features/authSlice/authSlice";

const ArtisanProfile = () => {
  const artisanId = useSelector(selectUserId);
  const {
    isLoading,
    isSuccess,
    data: artisan,
    error,
    currentData,
  } = useGetArtisanQuery(artisanId);

 
  let content;
  if (isLoading) {
    content = (
      <Box
        mt={3}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <CircularProgress size={100} />
      </Box>
    );
  }

  if (artisan) {

    const {
      profileImage,
      name,
      rating,
      commentCount,
      about,
      address,
      profession,
      socials,
      phoneNumber,
    } = artisan;
    content = (
      <>
        <Grid
          container
          spacing={2}
          direction={{ xs: "column", md: "row" }}
          m={{ xs: 0, md: "auto" }}
          width={{ xs: "100%", md: "80%" }}
          p={2}
        >
          <Grid sx={{ border: "solid" }} md={4}>
            <Avatar src={profileImage}></Avatar>
            <Typography>{name}</Typography>

            <Box component="span" sx={{ p: 2 }}>
              <Rating value={rating} readOnly name="Rating" />
              <Typography> {rating}</Typography>
            </Box>
            <Box component="span" sx={{ p: 2 }}>
              <Typography> Comments</Typography>
              <Typography> {commentCount}</Typography>
            </Box>
            <Button>Edit profile</Button>
          </Grid>
          <Grid sx={{ border: "solid" }} md={8}>
            <Typography variant="h4">About</Typography>
            <Box>
              <Typography>{profession}</Typography>
              <Typography>{about}</Typography>
              <Typography>{address}</Typography>
              <Box>
                <Typography sx={{ fontSize: 20 }}>Socials</Typography>
                <a
                  href={`https://facebook.com/${socials.facebook}`}
                  target="_blank"
                >
                  <IconButton>
                    <BsFacebook color="blue" />
                  </IconButton>
                </a>
                <a
                  href={`https://instagram.com/${socials.instagram}`}
                  target="_blank"
                >
                  <IconButton>
                    <AiOutlineInstagram color="red" />
                  </IconButton>
                </a>
                <a
                  href={`https://twitter.com/${socials.twitter}`}
                  target="_blank"
                >
                  <IconButton>
                    <AiOutlineTwitter color="blue" />
                  </IconButton>
                </a>
                <a href={`https://twitter.com/${phoneNumber}`} target="_blank">
                  <IconButton>
                    <AiOutlinePhone color="#000729" />
                  </IconButton>
                </a>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </>
    );
  }
  return content;
};

export default ArtisanProfile;
