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

import { useGetAllCommentsQuery, useGetRatingsQuery } from "../api/apiSlice";
import { useParams } from "react-router-dom";

const Details = ({ artisan }) => {
  // TO GET COMMENT COUNT
  const { id: artisanId } = useParams();
  const {
    data: commentData,
    isLoading,
    isSuccess,
  } = useGetAllCommentsQuery(artisanId);
  const { data: ratingsData, isSuccess: ratingsSuccess } =
    useGetRatingsQuery(artisanId);
  const { profileImage, name, username, profession, rating } = artisan;

  if (ratingsSuccess) {
    console.log(ratingsData);
  }

  return (
    <Box
      sx={{
        width: { lg: "50%", xs: "90% " },
        position: { lg: "sticky" },
        height: "fit-content",
        top:"64px"
      }}
    >
      <Paper elevation={16}>
        <Grid
          container
          sx={{
            display: "flex",
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
                fontSize: { xs: 20, sm: 30 },
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
                textTransform: "capitalize",
                fontSize: { xs: 25, sm: 50 },
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
          color="#000729"
          p={2}
        >
          {name}
        </Typography>
        <Grid container columns={{ xs: 2 }}>
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
            <Typography align="center" variant="h5" color="#000729">
              {ratingsSuccess && ratingsData.rating}
            </Typography>
          </Box>
          <Box sx={{ flex: "1", border: "solid 1px #000729 " }}>
            <Typography align="center" variant="h6" color="#000729">
              Comments
            </Typography>
            <Typography align="center" variant="h5" color="#000729">
              {isSuccess && commentData.comments.length}
            </Typography>
          </Box>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Details;
