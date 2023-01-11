import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import {
  FacebookOutlined,
  Twitter,
  Instagram,
  PhoneOutlined,
} from "@mui/icons-material";
import { BsFacebook } from "react-icons/bs";
import { AiOutlineTwitter, AiOutlineInstagram,AiOutlinePhone } from "react-icons/ai";
const Contact = ({ artisan }) => {
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
  return (
    <Box
      sx={{
        width: "100%",
      }}
      p={2}
    >
      <Box>
        <Typography align="left" sx={{ fontSize: 20 }}>
          Address
        </Typography>
        <Typography align="left" sx={{ fontSize: 20 }}>
          {address}
        </Typography>
      </Box>
      <Box>
        <Typography sx={{ fontSize: 20 }}>Socials</Typography>
        <a href={`https://facebook.com/${socials.facebook}`} target="_blank">
          <IconButton>
            {/* <FacebookOutlined /> */}
            <BsFacebook color="blue" />
          </IconButton>
        </a>
        <a href={`https://instagram.com/${socials.instagram}`} target="_blank">
          <IconButton>
            {/* <Instagram color="red" /> */}
            <AiOutlineInstagram color="red"/>
          </IconButton>
        </a>
        <a href={`https://twitter.com/${socials.twitter}`} target="_blank">
          <IconButton>
            {/* <Twitter /> */}
            <AiOutlineTwitter color="blue" />
          </IconButton>
        </a>
        <a href={`https://twitter.com/${phoneNumber}`} target="_blank">
          <IconButton>
            {/* <PhoneOutlined /> */}
            <AiOutlinePhone color="#000729"/>
          </IconButton>
        </a>
      </Box>
    </Box>
  );
};

export default Contact;
