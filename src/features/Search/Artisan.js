import React from "react";

import {
  Typography,
  Container,
  Card,
  CardHeader,
  IconButton,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  Stack,
  Rating,
  Divider,
} from "@mui/material";
import {
  FacebookOutlined,
  Twitter,
  Instagram,
  PhoneOutlined,
  MoreVert,
  ArrowForwardOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

import "./style.css";
const Artisan = ({ artisan }) => {
  return (
    <Card
      sx={{
        // maxWidth: 300,
        // minWidth: 300,
        // minHeight: 320,
        // maxHeight: 500,
        // flex: 1,
        height: { sm: 420, md: 420 },
        width:{xs:250, sm:"unset"},
        margin:"0 auto",
        //     float: {xs:"unset",md:"left"},
        //     margin: "10px",
        //    border:"solid yellow"
      }}
    >
      <CardHeader
        avatar={
          <Avatar src={artisan.profileImage} sx={{ width: 56, height: 56 }} />
        }
        title={artisan.profession}
        subheader={
          <Rating
            precision={0.5}
            name="rating"
            value={artisan.rating}
            readOnly
            size="medium"
          />
        }
        action={
          <Link to={`/details/${artisan.id}`}>
            <IconButton aria-label="settings">
              <ArrowForwardOutlined />
            </IconButton>
          </Link>
        }
        sx={{
          fontWeight: "900",
          background: "#D7C1CE",
          color: "#000729",
        }}
      />

      {/* <CardMedia
        component="img"
        height="100"
        image={artisan.profileImage}
        alt="Paella dish"
      /> */}

      <CardContent>
        <Divider textAlign="center">Info</Divider>
        <Typography variant="body2" align="left" mb={2}>
          Business Name: {artisan.username}
        </Typography>
        <Divider textAlign="center">summary</Divider>
        <Typography variant="body2" align="left" mb={2}>
          {artisan.about.substring(0, 150)}...
        </Typography>
        <Divider textAlign="center">Address</Divider>
        <Typography variant="body2">{artisan.address}</Typography>
      </CardContent>

      <CardActions>
        <a
          href={`https://facebook.com/${artisan.socials.facebook}`}
          target="_blank"
        >
          <IconButton aria-label="add to favorites">
            <FacebookOutlined />
          </IconButton>
        </a>
        <a
          href={`https://instagram.com/${artisan.socials.instagram}`}
          target="_blank"
        >
          <IconButton aria-label="share">
            <Instagram />
          </IconButton>
        </a>
        <a
          href={`https://twitter.com/${artisan.socials.twitter}`}
          target="_blank"
        >
          <IconButton aria-label="more">
            <Twitter />
          </IconButton>
        </a>
        <a href={`https://twitter.com/${artisan.phoneNumber}`} target="_blank">
          <IconButton aria-label="more">
            <PhoneOutlined />
          </IconButton>
        </a>
      </CardActions>
    </Card>
  );
};

export default Artisan;
