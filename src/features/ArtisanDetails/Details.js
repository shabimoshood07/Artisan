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
    <>
      <Box sx={{ width: { md: "50%", xs: "90% " } }}>
        <Paper elevation={16}>
          <Grid
            container
            // columns={{ xs: 2 }}
            sx={{
              display: "flex",
              border: "solid yellow",
              backgroundColor: "#000729",
              justifyContent: "center",
            }}
          >
            <Avatar
              src={profileImage}
              sx={{
                width: { xs: 120, sm: 220 },
                height: { xs: 120, sm: 220 },
                margin: "auto",
                margin: "1rem",
              }}
            ></Avatar>
            <Box sx={{ flex: "1", margin: "auto" }}>
              <Typography
                align="center"
                variant="h4"
                color="#d7c1ce"
                sx={{
                  textTransform: "capitalize",
                  fontSize: { xs: 25, sm: 50 },
                }}
              >
                {username}
              </Typography>
              <Typography
                mt={2}
                align="center"
                variant="h3"
                color="#d7c1ce"
                sx={{
                  textTransform: "uppercase",
                  fontSize: { xs: 35, sm: 60 },
                }}
              >
                {profession}
              </Typography>
            </Box>
          </Grid>
          <Typography
            sx={{
              textTransform: "uppercase",
              borderBottom: "solid 1px #000729",
              fontSize: { xs: 20, sm: 25 },
            }}
            variant="h5"
            align="center"
            p={2}
          >
            {name}
          </Typography>
          <Grid
            container
            columns={{ xs: 2 }}
            // sx={{ border: "solid", backgroundColor: "#000729" }}
          >
            <Box sx={{ flex: "1", border: "solid 1px #000729 " }}>
              <Rating
                value={rating}
                readOnly
                precision={0.5}
                size="large"
                sx={{
                  width: "100%",
                  justifyContent: "center",
                }}
              />
              <Typography align="center" variant="h5">
                {rating}
              </Typography>
            </Box>
            <Box sx={{ flex: "1", border: "solid 1px #000729 " }}>
              <Typography align="center" variant="h6">
                Comments
              </Typography>
              <Typography align="center" variant="h5">
                {comments.length}
              </Typography>
            </Box>
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default Details;
