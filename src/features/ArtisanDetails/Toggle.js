import React, { useEffect } from "react";

import {
  ToggleButton,
  Box,
  Typography,
  ToggleButtonGroup,
} from "@mui/material";

import { selectToggleValue, toggle } from "./toggleSlice";
import { useSelector, useDispatch } from "react-redux";

// CSS
import "./style.css";
import About from "./About";
import Comment from "./Comment";


const Toggle = () => {
  useEffect(() => {
    dispatch(toggle("about"));
  }, []);

  const dispatch = useDispatch();

  const toggleValue = useSelector(selectToggleValue);

  return (
    <Box sx={{ border: "solid red", width: { lg: "50%", xs: "90% " } }}>
      <ToggleButtonGroup
        value={toggleValue}
        exclusive
        onChange={(e, value) => dispatch(toggle(value))}
        sx={{
          // border: "solid",
          width: "100%",
          justifyContent: "space-between",
        }}
        defaultValue="about"
      >
        <ToggleButton
          value="about"
          sx={{ flex: 1 }}
          disabled={toggleValue == "about"}
        >
          <Typography sx={{ textTransform: "capitalize" }}>About</Typography>
        </ToggleButton>
        <ToggleButton
          value="contact"
          sx={{ flex: 1 }}
          disabled={toggleValue == "contact"}
        >
          <Typography sx={{ textTransform: "capitalize" }}>contact</Typography>
        </ToggleButton>
        <ToggleButton
          value="rating"
          sx={{ flex: 1 }}
          disabled={toggleValue == "rating"}
        >
          <Typography sx={{ textTransform: "capitalize" }}>rating</Typography>
        </ToggleButton>
        <ToggleButton
          value="comments"
          sx={{ flex: 1 }}
          disabled={toggleValue == "comments"}
        >
          <Typography sx={{ textTransform: "capitalize" }}>comments</Typography>
        </ToggleButton>
      </ToggleButtonGroup>
      <Box>
        {toggleValue == "about" && <About />}
        {toggleValue == "comments" && <Comment />}
      </Box>
    </Box>
  );
};

export default Toggle;
