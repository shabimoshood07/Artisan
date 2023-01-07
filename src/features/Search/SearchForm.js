import React from "react";
import { Box, Button, TextField } from "@mui/material";
import "./style.css";
const SearchForm = () => {
  return (
    <Box
      sx={{
        width: { xs: 500, md: 900 },
        margin: "0 auto",
        maxWidth: "100%",
        border: "solid red",
        padding: "1rem",
        display: "flex",
        gap: {md:"2rem", xs:"1rem"},
        // justifyContent: { xs: "center", sm: "space-between" },

        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <TextField
        fullWidth
        label="Search Location"
        // id="fullWidth"
        margin="normal"
      />
      <TextField
        fullWidth
        label="Search Profession"
        // id="fullWidth"
        margin="normal"
      />
      <Button className="btn">Search</Button>
    </Box>
  );
};

export default SearchForm;
