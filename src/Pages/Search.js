import React from "react";
import SearchForm from "../features/Search/SearchForm";
import ArtisanList from "../features/Search/ArtisanList";
import { Container } from "@mui/material";

const Search = () => {
  return (
    <Container
      className="container"
      sx={{
        backgroundColor: "#d7c1ce",
        paddingTop: "1.8rem !important",
        // paddingBottom: "1.8rem !important",
      }}
    >
      <SearchForm />
      <ArtisanList />
    </Container>
  );
};

export default Search;
