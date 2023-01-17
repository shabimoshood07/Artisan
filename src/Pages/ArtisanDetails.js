import React, { useEffect } from "react";

import { Container, CircularProgress, Box, Stack, Button } from "@mui/material";
import { useGetArtisanQuery } from "../features/api/apiSlice";
import { selectUserCredentials } from "../features/authSlice/authSlice";
import { useNavigate, useParams } from "react-router-dom";

// COMPONENTS
import Details from "../features/ArtisanDetails/Details";
import BasicTabs from "../features/ArtisanDetails/Tabs";
import { useSelector } from "react-redux";
const ArtisanDetails = () => {
  const { id } = useParams();
  const naviagte = useNavigate();
  const {
    data: artisan,
    isLoading,
    isSuccess,
    isError,
  } = useGetArtisanQuery(id);

  const { id: artisanId } = useSelector(selectUserCredentials);

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
          p={{ xs: 1, md: 2 }}
          direction={{ xs: "column", lg: "row" }}
          sx={{
            justifyContent: "center",
            alignItems: { xs: "center", lg: "unset" },
            // border: "solid green",
            width: { xs: "90%", md: "85%" },
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <Details artisan={artisan} />
          {/* <Toggle artisan={artisan} /> */}
          <BasicTabs artisan={artisan} />
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

  return content;
};

export default ArtisanDetails;
