import React from "react";

import { Container, CircularProgress, Box, Stack, Button } from "@mui/material";
import { useGetArtisanQuery } from "../features/api/apiSlice";
import { useParams } from "react-router-dom";
// COMPONENTS
import Details from "../features/ArtisanDetails/Details";
import Toggle from "../features/ArtisanDetails/Toggle";
import BasicTabs from "../features/ArtisanDetails/Tabs";
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
    content = (
      <Container sx={{ backgroundColor: "#d7c1ce" }} className="container">
        <Button>Back</Button>
        <Stack
          p={{ xs: 1, md: 3 }}
          direction={{ xs: "column", lg: "row" }}
          sx={{
            justifyContent: "center",
            alignItems: { xs: "center", lg: "unset" },
            // border: "solid green",
            width: { xs: "90%", md: "85%" },
            maxWidth: "1200px",
            margin: "0 auto",
            transition: "all 1s",
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
