import React from "react";

import { Container, CircularProgress, Box } from "@mui/material";
import { useGetArtisanQuery } from "../features/api/apiSlice";
import { useParams } from "react-router-dom";
// COMPONENTS
import Details from "../features/ArtisanDetails/Details";

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
      <Container sx={{ backgroundColor: "#d7c1ce", minHeight: "95vh" }} className="container">
        <Details artisan={artisan} />
      </Container>
    );
  }
  if (isLoading) {
    content = (
      <Container
        sx={{ backgroundColor: "#d7c1ce", }}
        className="container"
      >
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
