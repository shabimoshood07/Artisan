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
import { Link } from "react-router-dom";
import Contact from "./Contact";

const Toggle = ({ artisan }) => {
  const {
    profileImage,
    phoneNumber,
    alternativeNumber,
    name,
    role,
    username,
    email,
    address,
    profession,
    gender,
    about,
    rating,
    socials,
    comments,
  } = artisan;

  useEffect(() => {
    dispatch(toggle("about"));
  }, []);

  const dispatch = useDispatch();

  const toggleValue = useSelector(selectToggleValue);

  return (
    <Box
      sx={{
        border: "solid 1px  #000729",
        width: { lg: "50%", xs: "90% " },
        transition: "all 1s",
        backgroundColor: "white",
      }}
    >
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
          disabled={toggleValue === "about"}
        >
          {/* <a href="#about"> */}
          <Typography sx={{ textTransform: "capitalize" }}>About</Typography>
          {/* </a> */}
        </ToggleButton>
        <ToggleButton
          value="contact"
          sx={{ flex: 1 }}
          disabled={toggleValue === "contact"}
        >
          <a href="#contact">
            <Typography sx={{ textTransform: "capitalize" }}>
              contact
            </Typography>
          </a>
        </ToggleButton>
        <ToggleButton
          value="rating"
          sx={{ flex: 1 }}
          disabled={toggleValue === "rating"}
        >
          <a href="#rating">
            <Typography sx={{ textTransform: "capitalize" }}>rating</Typography>
          </a>
        </ToggleButton>
        <ToggleButton
          value="comments"
          sx={{ flex: 1 }}
          disabled={toggleValue === "comments"}
        >
          {/* <a href="#comments"> */}
          <Typography sx={{ textTransform: "capitalize" }}>comments</Typography>
          {/* </a> */}
        </ToggleButton>
      </ToggleButtonGroup>

      <Box
        sx={{
          transition: "all 1s",
          height: "fit-content",
          border: "solid pink",
        }}
      >
        {toggleValue === "about" && <About about={about} />}
        {toggleValue === "comments" && <Comment comments={comments} />}
        {toggleValue === "contact" && <Contact artisan={artisan} />}
        {/* <About about={about} />
        <Comment comments={comments} /> */}
      </Box>
    </Box>
  );
};

export default Toggle;
