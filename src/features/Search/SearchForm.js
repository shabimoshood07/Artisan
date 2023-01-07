import React, { useState, useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import "./style.css";
import { searchArtisan } from "../Search/SearchSlice";
import { useDispatch } from "react-redux";

const SearchForm = () => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState("");
  const [profession, setProfession] = useState("");

  useEffect(() => {
    dispatch(searchArtisan({profession, location}));
  }, []);

  const handleSearch = () => {
    dispatch(searchArtisan({profession, location}));
  };

  return (
    <Box
      sx={{
        width: { xs: 500, md: 900 },
        margin: "2rem auto",
        maxWidth: "100%",
        // border: "solid red",
        padding: "1rem",
        display: "flex",
        gap: { md: "2rem", xs: "1rem" },
        flexDirection: { xs: "column", md: "row" },
      }}
      component="form"
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
      <Button className="btn" onClick={handleSearch}>
        Search
      </Button>
    </Box>
  );
};

export default SearchForm;
