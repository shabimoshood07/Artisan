import {
  CircularProgress,
  Grid,
  Box,
  Avatar,
  Typography,
  Rating,
  Chip,
  Button,
  IconButton,
} from "@mui/material";
import React from "react";
import {
  AiOutlineInstagram,
  AiOutlinePhone,
  AiOutlineTwitter,
} from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useGetArtisanQuery } from "../features/api/apiSlice";
import { selectUserId } from "../features/authSlice/authSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";
const ArtisanProfile = () => {
  const artisanId = useSelector(selectUserId);
  const {
    isLoading,
    isSuccess,
    data: artisan,
    error,
    currentData,
  } = useGetArtisanQuery(artisanId);

  let content;
  if (isLoading) {
    content = (
      <Box
        mt={3}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <CircularProgress size={100} />
      </Box>
    );
  }

  if (artisan) {
    const {
      profileImage,
      name,
      rating,
      commentCount,
      about,
      address,
      profession,
      socials,
      phoneNumber,
      businessName,
      comments,
      likesCount,
    } = artisan;
    content = (
      <>
        <Grid
          container
          spacing={2}
          direction={{ xs: "column", md: "row" }}
          m={{ xs: 0, sm: "auto" }}
          width={{ xs: "100%", sm: "80%" }}
          p={2}
        >
          <Grid
            item
            sx={{
              border: "solid",
              display: "flex",
              // justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
            sm={4}
            p={0}
          >
            <Avatar src={profileImage} sx={{ width: 100, height: 100 }} />
            <Typography mt={2} variant="h5" sx={{ textTransform: "uppercase" }}>
              {name}
            </Typography>
            <Typography
              mt={2}
              variant="h5"
              align="center"
              sx={{ textTransform: "capitalize" }}
            >
              {businessName}
            </Typography>

            <Box
              component="span"
              sx={{
                p: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" pl={1}>
                {rating || 0}
              </Typography>
              <Rating
                value={Number(rating)}
                readOnly
                name="Rating"
                size="medium"
              />
            </Box>
            <Box
              component="span"
              sx={{
                p: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">{commentCount}</Typography>
              <Typography ml={1} variant="h6">
                {" "}
                Comments
              </Typography>
            </Box>
            <Button>Edit profile</Button>
          </Grid>
          <Grid item sx={{ border: "solid" }} sm={4} md={8}>
            <Typography variant="h4">About</Typography>
            <Box>
              <Typography>{profession}</Typography>
              <Typography>{about}</Typography>
              <Typography>{address}</Typography>
              <Box>
                <a
                  href={`https://facebook.com/${socials.facebook}`}
                  target="_blank"
                >
                  <IconButton>
                    <BsFacebook color="blue" />
                  </IconButton>
                </a>
                <a
                  href={`https://instagram.com/${socials.instagram}`}
                  target="_blank"
                >
                  <IconButton>
                    <AiOutlineInstagram color="red" />
                  </IconButton>
                </a>
                <a
                  href={`https://twitter.com/${socials.twitter}`}
                  target="_blank"
                >
                  <IconButton>
                    <AiOutlineTwitter color="blue" />
                  </IconButton>
                </a>
                <a href={`https://twitter.com/${phoneNumber}`} target="_blank">
                  <IconButton>
                    <AiOutlinePhone color="#000729" />
                  </IconButton>
                </a>
              </Box>
            </Box>
            <Box>
              <Typography>Comments</Typography>
              {comments.map((comment) => {
                const { commentText, createdAt, createdBy, _id, likesCount } =
                  comment;
                return (
                  <Box key={_id} mb={3} sx={{ borderBottom: "solid 1px " }}>
                    <Grid
                      container
                      columns={{ xs: 4 }}
                      sx={{ justifyContent: "space-between" }}
                    >
                      <Grid>
                        <Typography
                          align="left"
                          sx={{ textTransform: "capitalize" }}
                        >
                          {createdBy}
                        </Typography>
                      </Grid>
                      <Grid>
                        <Typography align="right" sx={{ fontSize: 13 }}>
                          {createdAt}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography align="left" sx={{ fontSize: 15 }}>
                      {commentText}
                    </Typography>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <IconButton disabled>
                        <FavoriteIcon />
                      </IconButton>
                      <Typography>{likesCount}</Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Grid>
        </Grid>
      </>
    );
  }
  return content;
};

export default ArtisanProfile;
