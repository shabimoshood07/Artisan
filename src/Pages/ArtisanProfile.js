import {
  CircularProgress,
  Grid,
  Box,
  Avatar,
  Typography,
  Rating,
  Button,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
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
import { format, parseISO } from "date-fns";

const ArtisanProfile = () => {
  const artisanId = useSelector(selectUserId);
  const {
    isLoading,
    isSuccess,
    data: artisan,
    error,
    currentData,
  } = useGetArtisanQuery(artisanId);

  const [commentChunk, setCommentChunk] = useState(10);
  const [showmoreBtn, setShowMoreBtn] = useState(true);

  useEffect(() => {
    if (artisan && commentChunk >= artisan.comments.length) {
      setShowMoreBtn(false);
    }
  }, [commentChunk]);

  const handleShowMore = () => {
    setCommentChunk(commentChunk + 10);
  };
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
          m={{ xs: "32px auto", sm: "32px auto" }}
          width={{ xs: "95%", sm: "80%" }}
          p={0}
          sx={{ justifyContent: { md: "flex-end" }, maxWidth: "1000px" }}
        >
          <Grid
            item
            sx={{
              display: "flex",
              height: "fit-content",
              alignItems: "center",
              flexDirection: "column",
              position: { md: "sticky" },
              top: "64px",
              background: "#000729",
              borderRight: { md: "solid 2px #f1f2f5" },
              borderBottom: { xs: "solid 2px", md: "none" },
            }}
            sm={4}
            pr={2}
            pb={2}
          >
            <Avatar src={profileImage} sx={{ width: 150, height: 150 }} />
            <Typography
              mt={2}
              variant="h5"
              sx={{
                textTransform: "uppercase",
                borderBottom: "solid 2px #f1f2f5",
                color: "#d7c1ce",
              }}
            >
              {name}
            </Typography>
            <Typography
              mt={2}
              variant="h5"
              align="center"
              sx={{ textTransform: "capitalize", color: "#d7c1ce" }}
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
                color: "#d7c1ce",
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
                color: "#d7c1ce",
              }}
            >
              <Typography variant="h6">{commentCount}</Typography>
              <Typography ml={1} variant="h6">
                Comments
              </Typography>
            </Box>
            <Button
              fullWidth
              sx={{
                backgroundColor: "#d32f2f",
                color: "#d7c1ce",
                transition: "all 0.9s",
                fontSize: "20px",
                "&:hover": {
                  color: "red",
                  background: "#d7c1ce",
                },
              }}
            >
              Edit profile
            </Button>
          </Grid>
          <Grid
            item
            sx={{
              background: "#fff",
            }}
            sm={4}
            md={8}
            pr={2}
            pb={2}
          >
            <Typography align="center" variant="h5" textTransform="uppercase">
              About
            </Typography>
            <Box mb={3} sx={{ borderBottom: "solid 1px" }}>
              <Typography my={2} variant="h5">
                {profession}
              </Typography>
              <Typography component="p" my={2}>
                {about}
              </Typography>
              <Typography variant="h6" component="h1" align="center">
                {address}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "1rem",
                }}
              >
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
                <a href={`tel:${phoneNumber}`} target="_blank">
                  <IconButton>
                    <AiOutlinePhone color="#000729" />
                  </IconButton>
                </a>
              </Box>
            </Box>

            {/* COMMENT */}
            <Box>
              <Typography align="center" variant="h5" textTransform="uppercase">
                Comments
              </Typography>
              {comments.length > 0 ? (
                <Box>
                  {comments.slice(0, commentChunk).map((comment) => {
                    const {
                      commentText,
                      createdAt,
                      createdBy,
                      _id,
                      likesCount,
                    } = comment;
                    const dateString = createdAt;
                    const dateObject = parseISO(dateString);
                    const month = format(dateObject, "MMMM");
                    const year = format(dateObject, "yyyy");

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
                              {month} {year}
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
                            <FavoriteIcon sx={{ color: "red" }} />
                          </IconButton>
                          <Typography>{likesCount}</Typography>
                        </Box>
                      </Box>
                    );
                  })}
                  {showmoreBtn && (
                    <Button
                      fullWidth
                      sx={{
                        backgroundColor: "#d32f2f",
                        color: "#d7c1ce",
                        transition: "all 0.5s",
                        fontSize: "20px",
                        "&:hover": {
                          color: "red",
                          background: "#d7c1ce",
                        },
                      }}
                      onClick={handleShowMore}
                    >
                      Show more
                    </Button>
                  )}
                </Box>
              ) : (
                <Typography align="center" mt={2} component="h3" variant="h5">
                  No Comments!!
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </>
    );
  }
  return content;
};

export default ArtisanProfile;
