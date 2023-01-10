import React from "react";

import { Container, CircularProgress, Box, Stack } from "@mui/material";
import { useGetArtisanQuery } from "../features/api/apiSlice";
import { useParams } from "react-router-dom";
// COMPONENTS
import Details from "../features/ArtisanDetails/Details";
import Toggle from "../features/ArtisanDetails/Toggle";
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
    content = (
      <Container
        sx={{ backgroundColor: "#d7c1ce", minHeight: "95vh" }}
        className="container"
      >
        <Stack
          p={{ xs: 1, md: 5 }}
          direction={{ xs: "column", md: "row" }}
          sx={{
            justifyContent: "center",
            alignItems: { xs: "center", md: "unset" },
            border: "solid green",
            width: { xs: "90%", md: "80%" },
            margin:"0 auto"
          }}
        >
          <Details artisan={artisan} />
          <Toggle />
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
