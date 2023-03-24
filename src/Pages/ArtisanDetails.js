import React, { useEffect } from "react";

import {
  Container,
  CircularProgress,
  Box,
  Stack,
  Button,
  Typography,
} from "@mui/material";
import { useGetArtisanQuery } from "../features/api/apiSlice";
import { selectUserId } from "../features/authSlice/authSlice";
import { useNavigate, useParams } from "react-router-dom";

// COMPONENTS
import Details from "../features/ArtisanDetails/Details";
import { useSelector } from "react-redux";
import DetailsTab from "../features/ArtisanDetails/DetailsTabs";
const ArtisanDetails = () => {
  const { id } = useParams();
  const naviagte = useNavigate();
  const {
    data: artisan,
    isLoading,
    isSuccess,
    isError,
    error,
    currentData,
  } = useGetArtisanQuery(id);

  const artisanId = useSelector(selectUserId);

  useEffect(() => {
    if (id == artisanId) {
      naviagte(`/profile/${id}`);
    }
  }, []);

  let content;

  if (isSuccess) {
    content = (
      <Container sx={{ backgroundColor: "#d7c1ce" }} className="container">
        <Box
          sx={{
            width: { xs: "90%", md: "85%" },
            maxWidth: "1200px",
            margin: "0 auto",
          }}
          p={{ xs: 1, md: 2 }}
        >
          <Button sx={{ border: "solid" }}>Back</Button>
        </Box>
        <Stack
          // p={{ xs: 1, md: 2 }}
          direction={{ xs: "column", lg: "row" }}
          sx={{
            justifyContent: "center",
            alignItems: { xs: "center", lg: "unset" },
            width: { xs: "98%", md: "85%" },
            maxWidth: "1200px",
            margin: "0 auto",
            border:"solid red"
          }}
        >
          <Details artisan={artisan} />
          <DetailsTab artisan={artisan} />
        </Stack>
      </Container>
    );
  }
  if (isLoading) {
    content = (
      <Container sx={{ backgroundColor: "#d7c1ce" }} className="container">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            paddingTop: "2rem",
            minHeight: "95vh",
          }}
        >
          <CircularProgress size={100} />
        </Box>
      </Container>
    );
  }

  if (error) {
    content = (
      <Container sx={{ backgroundColor: "#d7c1ce" }} className="container">
        <Box
          sx={{
            width: { xs: "90%", md: "85%" },
            maxWidth: "1200px",
            margin: "0 auto",
          }}
          p={{ xs: 1, md: 2 }}
        >
          <Button sx={{ border: "solid" }}>Back</Button>
        </Box>
        <Typography mt={6} align="center" fontSize={50} color="#000729">
          No Artisan Found!!
        </Typography>
      </Container>
    );
  }

  return content;
};

export default ArtisanDetails;
