import React, { useEffect } from "react";
import Artisan from "./Artisan";
import {
  selectSearchError,
  selectSearchList,
  selectSearchStatus,
  searchArtisan,
} from "../Search/SearchSlice";
import { useSelector, useDispatch } from "react-redux";
import { Container, Stack, Typography } from "@mui/material";

// CSS
import "./style.css";

const ArtisanList = () => {
  const dispatch = useDispatch();

  const status = useSelector(selectSearchStatus);
  const searchList = useSelector(selectSearchList);
  const error = useSelector(selectSearchError);

  console.log(status);
  let content;

  if (status === "failed") {
    content = <p>{error}</p>;
  } else if (status === "loading") {
    content = <p>Loading....</p>;
  } else if (status === "succeeded") {
    if (searchList.length == 0) {
      content = <Typography>NO Artisan found!</Typography>;
    } else {
      content = searchList.map((artisan) => {
        return <Artisan key={artisan.id} artisan={artisan} />;
      });
    }
  }
  return (
    <Container
      sx={{
        paddingTop: "1rem",
        paddingBottom: "2rem",
        background: "#000729",
        minHeight: "60vh",
        maxWidth: "unset !important",
      }}

      //   className="container search-con"
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
