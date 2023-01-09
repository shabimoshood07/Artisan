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

const Details = ({ artisan }) => {
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

  return (
    <Stack p={5} direction={{ xs: "column", md: "row" }}>
      <Box sx={{ border: "solid", width: "50%" }}>
        <Paper elevation={16}>
          <Grid
            container
            columns={{ xs: 2 }}
            sx={{ border: "solid", backgroundColor: "#000729" }}
          >
            <Avatar
              src={profileImage}
              sx={{ width: 220, height: 220, margin: "auto" }}
            ></Avatar>
            <Box sx={{ border: "solid yellow", flex: "1", margin: "auto" }}>
              <Typography
                align="center"
                variant="h4"
                color="#d7c1ce"
                sx={{ textTransform: "capitalize" }}
                >
                {username}
              </Typography>
              <Typography
                mt={2}
                align="center"
                variant="h3"
                color="#d7c1ce"
                sx={{ textTransform: "uppercase" }}
              >
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
};

export default Details;
