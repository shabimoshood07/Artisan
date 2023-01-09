import React, { useEffect } from "react";
import Artisan from "./Artisan";
import {
  selectSearchError,
  selectSearchList,
  selectSearchStatus,
  searchArtisan,
} from "../Search/SearchSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Stack,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";

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
    content = (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          paddingTop: "2rem",
        }}
      >
        <CircularProgress size={100} />
      </Box>
    );
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
        padding:"0",
        paddingTop: "2rem",
        paddingBottom: "2rem",
        background: "#000729",
        minHeight: "80vh",
        maxWidth: "unset !important",
        // border:"solid green"
      }}
    >
      <Box
        sx={{
        //   border: "solid red",
          margin: "0 auto",
          width: { xs: "100%", sm: "60%", md: "100%" },
          maxWidth: 1500,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
          alignItems: "stretch",
        }}
      >
        {content}
      </Box>
    </Container>
  );
};

export default ArtisanList;
