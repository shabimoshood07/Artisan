import React from "react";

// MATERIAL UI IMPORT
import { Box, Button, Container, Grid, Typography } from "@mui/material";

import {selectLoggedInStatus}  from  "../authSlice/authSlice"
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

// CSS IMPORT
import "./style.css";


const Welcome = () => {

  const isLoggedIn = useSelector(selectLoggedInStatus)
console.log(isLoggedIn);

  return (
    <Container className="main-con">
      <Box sx={{
        //  border: "solid",
         height: "100%",
      //  background: "rgba(0,0,0,.6)"
        }}>
        <Grid
          direction="column"
          // direction={{ xs: "column", md: "row" }}
          container
          spacing={2}
          // columns={16}
          sx={{
            // border: "solid blue",
            margin: "0 auto",
            width:{xs:"95%", sm:"80%"},
            alignItems: "center",
            justifyContent: {xs:"flex-start", sm:"center"},
          borderRadius:"20px",
            height: "80vh",
            backgroundColor:"rgba(215, 193, 206, .7)",
            flexWrap:"wrap"
          }}
        >
          <Grid
          //  sm={8}
           className="grid-con"
           sx={{width:{xs:"100%", md:"70%"}, justifyContent:{xs:"flex-start", md:"center"}}}
           >
            <Typography className="welcome-text" align="center" 
            sx={{fontSize : {xs:"1.2rem", sm:"1.5rem", md:"1.8rem"}}}>
              Welcome to <span>Artisans! </span> We provide access to a team of
              dedicated professionals committed to providing top-quality
              products and services to customers. We hope you find what you're
              looking for,and if you have any questions, don't hesitate to
              contact us
            </Typography>
          </Grid>
          <Grid 
          // sm={8} 
          sx={{width:{xs:"100%", md:"70%"},display:"flex", justifyContent:"center", alignItems:"center",
          //  border:"solid green",
            flexDirection:{xs:"column", sm:"row"}}}
          >
          { isLoggedIn? <Link to='/search'>
            <Button className="btn">Search Artisans</Button> 
          </Link>
          :
          <>
          <Button className="btn">Login</Button>
            <Button className="btn">Sign up</Button>
            <Link to='/search'>
            <Button className="btn">Search Artisans</Button> 
          </Link>
           </>
            }
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Welcome;
