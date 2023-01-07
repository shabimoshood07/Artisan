import React from "react";
import Artisan from "./Artisan";
import { useGetAllArtisansQuery } from "../api/apiSlice";
import { Container, Stack } from "@mui/material";
const ArtisanList = () => {
  const { data: artisans, isLoading, isSuccess } = useGetAllArtisansQuery();
  let content;
  if (isSuccess) {
    content = artisans.map((artisan) => {
      return <Artisan key={artisan.id} artisan={artisan} />;
    });
  }
  return (
    <Container
      sx={{
        padding: "0",
        paddingTop: "1rem",
        paddingBottom: "2rem",
        margin: "0",
        maxWidth: "unset !important",
        background: "#000729",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
        }}
      >
        {content}
      </Stack>
    </Container>
  );
};

export default ArtisanList;
