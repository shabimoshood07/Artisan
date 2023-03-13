import React from "react";

// MATERIAL UI IMPORT
import { Box, Button, Container, Grid, Icon, Typography } from "@mui/material";

import { selectLoggedInStatus } from "../authSlice/authSlice";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

// CSS IMPORT
import "./style.css";

const Welcome = () => {
  const isLoggedIn = useSelector(selectLoggedInStatus);
  return (
    <Container className="main-con">
      <Box
        sx={{
          height: "100%",
        }}
      >
        <Grid
          direction="column"
          container
          spacing={2}
          sx={{
            margin: "0 auto",
            width: { xs: "95%", sm: "80%" },
            alignItems: "center",
            justifyContent: { xs: "flex-start", sm: "center" },
            borderRadius: "20px",
            height: "80vh",
            backgroundColor: "rgba(215, 193, 206, .7)",
            WebkitFlexWrap: "nowrap",
          }}
        >
          <Grid
            className="grid-con"
            sx={{
              width: { xs: "100%", md: "70%" },
              justifyContent: { xs: "flex-start", md: "center" },
            }}
          >
            <Typography
              className="welcome-text"
              align="center"
              sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.8rem" } }}
            >
              Welcome to <span>Artisans! </span> We provide access to a team of
              dedicated professionals committed to providing top-quality
              products and services to customers. We hope you find what you're
              looking for,and if you have any questions, don't hesitate to
              contact us
            </Typography>
          </Grid>
          <Grid
            // sm={8}
            sx={{
              width: { xs: "100%", md: "70%" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              //  border:"solid green",
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            {isLoggedIn ? (
              <Link to="/search">
                <Button
                  sx={{
                    "&.btn": {
                      width: "fit-content",
                    },
                  }}
                  className="btn"
                >
                  Search Artisans
                </Button>
              </Link>
            ) : (
              <Box sx={{ width: "100%" }}>
                <Link to="/search">
                  <Button sx={{ padding: 1 }} className="btn">
                    Search Artisans
                  </Button>
                </Link>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Welcome;
