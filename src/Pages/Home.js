import React from "react";

// MaterialUi
import { Container } from "@mui/system";

import { useGetAllArtisansQuery } from "../features/api/apiSlice";

import FeaturedArtisans from "../features/featuredArtisans/FeaturedArtisans";
import Welcome from "../features/Welcome/Welcome";

const Home = () => {
  const {
    artisans: data,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllArtisansQuery();

  return (
    <Container
      sx={{
        // border: "solid blue",
        padding: "0 !important",
        margin: "0",
        maxWidth: "unset !important",
      }}
    >
      <Welcome />
      <FeaturedArtisans />
    </Container>
  );
};

export default Home;
