import React, { useEffect, useState } from "react";
import Artisan from "./Artisan";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Stack,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";

import { useSearchArtisanQuery } from "../../features/api/apiSlice";

import {
  searchArtisan,
  selectAllArtisan,
  selectSearchStatus,
  selectSearchError,
} from "../Search/SearchSlice";

// CSS
import "./style.css";

const ArtisanList = () => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState("");
  const [profession, setProfession] = useState("");

  const status = useSelector(selectSearchStatus);
  const searchResult = useSelector(selectAllArtisan);
  const error = useSelector(selectSearchError);

  useEffect(() => {
    if (status == "idle") {
      dispatch(searchArtisan({ location, profession }));
    }
  }, []);

  let content;

  if (status == "failed") {
    content = <p>{error}</p>;
  }

  if (status == "loading") {
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
  }

  if (status == "succeeded") {
    if (searchResult.length == 0) {
      content = <Typography>NO Artisan found!</Typography>;
    } else {
      content = searchResult.map((artisan) => {
        return <Artisan key={artisan._id} artisan={artisan} />;
      });
    }
  }
  return (
    <Container
      sx={{
        padding: "0",
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
