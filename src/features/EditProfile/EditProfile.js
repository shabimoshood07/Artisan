// import {
//     CircularProgress,
//     Grid,
//     Box,
//     Avatar,
//     Typography,
//     Rating,
//     Button,
//     IconButton,
//   } from "@mui/material";
//   import React, { useEffect, useState } from "react";
//   import {
//     AiOutlineInstagram,
//     AiOutlinePhone,
//     AiOutlineTwitter,
//   } from "react-icons/ai";
//   import { BsFacebook } from "react-icons/bs";
//   import { useSelector } from "react-redux";
//   import { useGetArtisanQuery } from "../features/api/apiSlice";
//   import { selectUserId } from "../features/authSlice/authSlice";
//   import FavoriteIcon from "@mui/icons-material/Favorite";
//   import { format, parseISO } from "date-fns";

//   const EditProfile = () => {
//     const artisanId = useSelector(selectUserId);
//     const {
//       isLoading,
//       isSuccess,
//       data: artisan,
//       error,
//       currentData,
//     } = useGetArtisanQuery(artisanId);

//     const [commentChunk, setCommentChunk] = useState(10);
//     const [showmoreBtn, setShowMoreBtn] = useState(true);

//     useEffect(() => {
//       if (artisan && commentChunk >= artisan.comments.length) {
//         setShowMoreBtn(false);
//       }
//     }, [commentChunk]);

//     const handleShowMore = () => {
//       setCommentChunk(commentChunk + 10);
//     };
//     let content;
//     if (isLoading) {
//       content = (
//         <Box
//           mt={3}
//           sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
//         >
//           <CircularProgress size={100} />
//         </Box>
//       );
//     }

//     if (artisan) {
//       const {
//         profileImage,
//         name,
//         rating,
//         commentCount,
//         about,
//         address,
//         profession,
//         socials,
//         phoneNumber,
//         businessName,
//         comments,
//         likesCount,
//       } = artisan;
//       content = (
//         <>
//           <Grid
//             container
//             spacing={2}
//             direction={{ xs: "column", md: "row" }}
//             m={{ xs: "32px auto", sm: "32px auto" }}
//             width={{ xs: "95%", sm: "80%" }}
//             p={0}
//             sx={{ justifyContent: { md: "flex-end" }, maxWidth: "1000px" }}
//           >
//             <Grid
//               item
//               sx={{
//                 display: "flex",
//                 height: "fit-content",
//                 alignItems: "center",
//                 flexDirection: "column",
//                 position: { md: "sticky" },
//                 top: "64px",
//                 background: "#000729",
//                 borderRight: { md: "solid 2px #f1f2f5" },
//                 borderBottom: { xs: "solid 2px", md: "none" },
//               }}
//               sm={4}
//               pr={2}
//               pb={2}
//             >
//               <Avatar src={profileImage} sx={{ width: 150, height: 150 }} />
//               <Typography
//                 mt={2}
//                 variant="h5"
//                 sx={{
//                   textTransform: "uppercase",
//                   borderBottom: "solid 2px #f1f2f5",
//                   color: "#d7c1ce",
//                 }}
//               >
//                 {name}
//               </Typography>
//               <Typography
//                 mt={2}
//                 variant="h5"
//                 align="center"
//                 sx={{ textTransform: "capitalize", color: "#d7c1ce" }}
//               >
//                 {businessName}
//               </Typography>

//               <Box
//                 component="span"
//                 sx={{
//                   p: 2,
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   color: "#d7c1ce",
//                 }}
//               >
//                 <Typography variant="h6" pl={1}>
//                   {rating || 0}
//                 </Typography>
//                 <Rating
//                   value={Number(rating)}
//                   readOnly
//                   name="Rating"
//                   size="medium"
//                 />
//               </Box>
//               <Box
//                 component="span"
//                 sx={{
//                   p: 2,
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   color: "#d7c1ce",
//                 }}
//               >
//                 <Typography variant="h6">{commentCount}</Typography>
//                 <Typography ml={1} variant="h6">
//                   Comments
//                 </Typography>
//               </Box>
//               <Button
//                 fullWidth
//                 sx={{
//                   backgroundColor: "#d32f2f",
//                   color: "#d7c1ce",
//                   transition: "all 0.9s",
//                   fontSize: "20px",
//                   "&:hover": {
//                     color: "red",
//                     background: "#d7c1ce",
//                   },
//                 }}
//               >
//                 Edit profile
//               </Button>
//             </Grid>
//             <Grid
//               item
//               sx={{
//                 background: "#fff",
//               }}
//               sm={4}
//               md={8}
//               pr={2}
//               pb={2}
//             >
//               <Typography align="center" variant="h5" textTransform="uppercase">
//                 About
//               </Typography>
//               <Box mb={3} sx={{ borderBottom: "solid 1px" }}>
//                 <Typography my={2} variant="h5" textTransform="capitalize">
//                   {profession}
//                 </Typography>
//                 <Typography component="p" my={2}>
//                   {about}
//                 </Typography>
//                 <Typography variant="h6" component="h1" align="center">
//                   {address}
//                 </Typography>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "center",
//                     gap: "1rem",
//                   }}
//                 >
//                   <a
//                     href={`https://facebook.com/${socials.facebook}`}
//                     target="_blank"
//                   >
//                     <IconButton>
//                       <BsFacebook color="blue" />
//                     </IconButton>
//                   </a>
//                   <a
//                     href={`https://instagram.com/${socials.instagram}`}
//                     target="_blank"
//                   >
//                     <IconButton>
//                       <AiOutlineInstagram color="red" />
//                     </IconButton>
//                   </a>
//                   <a
//                     href={`https://twitter.com/${socials.twitter}`}
//                     target="_blank"
//                   >
//                     <IconButton>
//                       <AiOutlineTwitter color="blue" />
//                     </IconButton>
//                   </a>
//                   <a href={`tel:${phoneNumber}`} target="_blank">
//                     <IconButton>
//                       <AiOutlinePhone color="#000729" />
//                     </IconButton>
//                   </a>
//                 </Box>
//               </Box>

//               {/* COMMENT */}
//               <Box>
//                 <Typography align="center" variant="h5" textTransform="uppercase">
//                   Comments
//                 </Typography>
//                 {comments.length > 0 ? (
//                   <Box>
//                     {comments.slice(0, commentChunk).map((comment) => {
//                       const {
//                         commentText,
//                         createdAt,
//                         createdBy,
//                         _id,
//                         likesCount,
//                       } = comment;
//                       const dateString = createdAt;
//                       const dateObject = parseISO(dateString);
//                       const month = format(dateObject, "MMMM");
//                       const year = format(dateObject, "yyyy");

//                       return (
//                         <Box key={_id} mb={3} sx={{ borderBottom: "solid 1px " }}>
//                           <Grid
//                             container
//                             columns={{ xs: 4 }}
//                             sx={{ justifyContent: "space-between" }}
//                           >
//                             <Grid>
//                               <Typography
//                                 align="left"
//                                 sx={{ textTransform: "capitalize" }}
//                               >
//                                 {createdBy}
//                               </Typography>
//                             </Grid>
//                             <Grid>
//                               <Typography align="right" sx={{ fontSize: 13 }}>
//                                 {month} {year}
//                               </Typography>
//                             </Grid>
//                           </Grid>
//                           <Typography align="left" sx={{ fontSize: 15 }}>
//                             {commentText}
//                           </Typography>
//                           <Box
//                             sx={{
//                               width: "100%",
//                               display: "flex",
//                               justifyContent: "flex-end",
//                               alignItems: "center",
//                             }}
//                           >
//                             <IconButton disabled>
//                               <FavoriteIcon sx={{ color: "red" }} />
//                             </IconButton>
//                             <Typography>{likesCount}</Typography>
//                           </Box>
//                         </Box>
//                       );
//                     })}
//                     {showmoreBtn && (
//                       <Button
//                         fullWidth
//                         sx={{
//                           backgroundColor: "#d32f2f",
//                           color: "#d7c1ce",
//                           transition: "all 0.5s",
//                           fontSize: "20px",
//                           "&:hover": {
//                             color: "red",
//                             background: "#d7c1ce",
//                           },
//                         }}
//                         onClick={handleShowMore}
//                       >
//                         Show more
//                       </Button>
//                     )}
//                   </Box>
//                 ) : (
//                   <Typography align="center" mt={2} component="h3" variant="h5">
//                     No Comments!!
//                   </Typography>
//                 )}
//               </Box>
//             </Grid>
//           </Grid>
//         </>
//       );
//     }
//     return content;
//   };

//   export default EditProfile;

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useEffect } from "react";
import { redirect, useLocation, useNavigate } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function EditProfile() {
  let { state } = useLocation();
  const naviagte  = useNavigate()
  // const myProp = access.location.state.access;
  console.log(state);
  // console.log(access);
  useEffect(() => {
    if (!state?.access) {
      naviagte("/login");
    }
  }, []);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 224,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab label="Item One" {...a11yProps(0)} />
        <Tab label="Item Two" {...a11yProps(1)} />
        <Tab label="Item Three" {...a11yProps(2)} />
        <Tab label="Item Four" {...a11yProps(3)} />
        <Tab label="Item Five" {...a11yProps(4)} />
        <Tab label="Item Six" {...a11yProps(5)} />
        <Tab label="Item Seven" {...a11yProps(6)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
    </Box>
  );
}
