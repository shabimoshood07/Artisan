import React from "react";
import {
  Stack,
  Box,
  Paper,
  Avatar,
  Typography,
  Rating,
  Grid,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetArtisanQuery } from "../features/api/apiSlice";
import { deepOrange, deepPurple } from "@mui/material/colors";
import { border } from "@mui/system";
const ArtisanDetails = () => {
  const { id } = useParams();
  const {
    data: artisan,
    isLoading,
    isSuccess,
    isError,
  } = useGetArtisanQuery(id);

  let content;

  if (isSuccess) {
    console.log(artisan);
    const {
      profileImage,
      phoneNumber,
      alternativeNumber,
      name,
      role,
      username,
      email,
      address,
      profession,
      gender,
      about,
      rating,
      socials,
      comments,
    } = artisan;
    content = (
      <Stack p={5} direction={{ xs: "column", md: "row" }}>
        <Box sx={{ border: "solid", width: "50%" }}>
          <Paper elevation={16}>
            <Grid container  columns={{ xs: 2}} sx={{ border: "solid" }}>
              <Avatar
                src={profileImage}
                sx={{ width: 200, height: 200 }}
              ></Avatar>
              <Box sx={{ border: "solid yellow" }}>
                <Typography>{username}</Typography>
                <Typography sx={{ textTransform: "uppercase" }}>
                  {profession}
                </Typography>
              </Box>
            </Grid>
            <Typography sx={{ textTransform: "uppercase" }}>{name}</Typography>
            <Box>
              <Rating value={rating} readOnly precision={0.5} size="large" />
              <Typography>{rating}</Typography>
            </Box>
            <Box>
              <Typography>Comments</Typography>
              <Typography>{comments.length}</Typography>
            </Box>
          </Paper>
        </Box>
        <Box sx={{ border: "solid red", width: "50%" }}></Box>
      </Stack>
    );
  }

  return content;
};

export default ArtisanDetails;
