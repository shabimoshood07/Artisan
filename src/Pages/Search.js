import React from "react";
import SearchForm from "../features/Search/SearchForm";
import ArtisanList from "../features/Search/ArtisanList";
import { Container } from "@mui/material";

const Search = () => {
  return (
    <Container
      className="container"
      sx={{ border: "solid red", minHeight: "95vh", backgroundColor: "#d7c1ce" }}
    >
      <SearchForm />
      <ArtisanList />
    </Container>
  );
};

export default Search;
