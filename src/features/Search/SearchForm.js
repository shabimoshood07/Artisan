import React, { useState, useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import "./style.css";
import { searchArtisan } from "../Search/SearchSlice";
import { useDispatch } from "react-redux";

const SearchForm = () => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState("");
  const [profession, setProfession] = useState("");
  const [page, setPage] = useState(1);

  
  const handleSearch = (e) => {
    dispatch(searchArtisan({ profession, location, page }));
    e.preventDefault();
  };

  return (
    <Box
      sx={{
        width: { xs: 500, md: 900 },
        margin: "auto",
        marginBottom: "4rem",
        maxWidth: "100%",
        // border: "solid red",
        padding: "1rem",
        display: "flex",
        gap: { md: "2rem", xs: "1rem" },
        flexDirection: { xs: "column", md: "row" },
      }}
      component="form"
      noValidate
      autoComplete="off"
    >
      <TextField
        fullWidth
        label="Search Location"
        margin="normal"
        onChange={(e) => setLocation(e.target.value)}
      />
      <TextField
        fullWidth
        label="Search Profession"
        margin="normal"
        onChange={(e) => setProfession(e.target.value)}
      />
      <Button type="submit" className="btn" onClick={handleSearch}>
        Search
      </Button>
    </Box>
  );
};

export default SearchForm;
