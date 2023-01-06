import React from "react";

// MATERIAL UI IMPORT
import { Box, Button, Container, Grid, Typography } from "@mui/material";

// CSS IMPORT
import "./style.css";

const Welcome = () => {
  return (
    <Container className="main-con">
      <Box sx={{ border: "solid", height: "100%",
       background: "rgba(0,0,0,.6)"
        }}>
        <Grid
          direction={{ xs: "column", md: "row" }}
          container
          spacing={2}
          columns={16}
          sx={{
            border: "solid blue",
            margin: "0",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            // height: "100%",
          }}
        >
          <Grid md={8} sx={{ border: "solid yellow", height: "100%", p: 4 }}>
            <Typography className="welcome-text" align="left">
              Welcome to <span>Artisans! </span> We provide access to a team of
              dedicated professionals committed to providing top-quality
              products and services to customers. We hope you find what you're
              looking for,and if you have any questions, don't hesitate to
              contact us
            </Typography>
          </Grid>
          <Grid md={8} sx={{ border: "solid green" }}>
            <Button>Login</Button>
            <Button>Sign up</Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Welcome;
