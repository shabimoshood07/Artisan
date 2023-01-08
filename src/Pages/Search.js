import React from "react";
import SearchForm from "../features/Search/SearchForm";
import ArtisanList from "../features/Search/ArtisanList";
import { Container } from "@mui/material";

const Search = () => {
  return (
    <Container
      className="container"
      sx={{
        // border: "solid",
        // minHeight: "95vh",
        backgroundColor: "#d7c1ce",
        paddingTop:"1.8rem !important"
      }}
    >
      <SearchForm />
      <ArtisanList />
    </Container>
  );
};

export default Search;
