import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectLoggedInStatus,
  selectUserCredentials,
} from "../authSlice/authSlice";

import { useGetAllArtisansQuery, useGetAllUsersQuery } from "../api/apiSlice";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  CommentOutlined,
  StarOutline,
  LogoutOutlined,
} from "@mui/icons-material";

// Import the different navs
import ArtisanNav from "./ArtisanNav";
import USerNav from "./UserNav";
import "./style.css";

const drawerWidth = 240;
let navItems = ["Login", "Sign Up"];

function Navbar(props) {
  // User Credentials
  const { user, token, role, email } = useSelector(selectUserCredentials);
  // logged in status
  const isLoggedIn = useSelector(selectLoggedInStatus);

  const { data: artisans, isSuccess } = useGetAllArtisansQuery();

  const { data: users, isSuccess: userSuccess } = useGetAllUsersQuery();

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        ARTISAN
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  let content;
  if (!isLoggedIn) {
    return (
      <Box sx={{ display: "flex", border: "solid red" }}>
        <CssBaseline />
        <AppBar
          component="nav"
          sx={{ border: "solid red", background: "#000729" }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              ARTISAN
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Button key={item} sx={{ color: "#fff" }}>
                  {item}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box component="main">
          <Toolbar />
        </Box>
      </Box>
    );
  }

  if (isLoggedIn && role == "artisan") {
    return <ArtisanNav />;
  }
  if (isLoggedIn && role == "user") {
    return <USerNav />;
  }

  // if (isLoggedIn && role == "artisan" && isSuccess) {
  //   const artisan = artisans.find((artisan) => artisan.email == email);
  //   content = (
  //     <Box sx={{ display: "flex" }}>
  //       <CssBaseline />
  //       <AppBar
  //         component="nav"
  //         sx={{
  //           // border: "solid red",
  //           background: "#001166",
  //         }}
  //       >
  //         <Toolbar
  //           sx={{
  //             // border: "solid yellow",
  //             width: { xs: "97%", md: "85%" },
  //             marginLeft: "auto",
  //             marginRight: "auto",
  //           }}
  //         >
  //           <IconButton
  //             color="inherit"
  //             aria-label="open drawer"
  //             edge="start"
  //             onClick={handleDrawerToggle}
  //             sx={{ mr: 2, display: { sm: "none" } }}
  //             className="icon"
  //           >
  //             <MenuIcon />
  //           </IconButton>
  //           <Typography
  //             variant="h6"
  //             component="div"
  //             sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
  //           >
  //             ARTISAN
  //           </Typography>
  //           <Box sx={{ display: { xs: "none", sm: "block" } }}>
  //             <Button>
  //               <Avatar src={artisan.profileImage} alt={artisan.name} />
  //             </Button>
  //             <IconButton size="large" className="icon">
  //               <Badge badgeContent={4} color="error">
  //                 <CommentOutlined />
  //               </Badge>
  //             </IconButton>
  //             <IconButton size="large" className="icon">
  //               <Badge badgeContent={17} color="error">
  //                 <StarOutline />
  //               </Badge>
  //             </IconButton>
  //             <Button className="logout-btn">
  //               Logout
  //               <LogoutOutlined />
  //             </Button>
  //           </Box>
  //         </Toolbar>
  //       </AppBar>
  //       <Box component="nav">
  //         <Drawer
  //           container={container}
  //           variant="temporary"
  //           open={mobileOpen}
  //           onClose={handleDrawerToggle}
  //           ModalProps={{
  //             keepMounted: true, // Better open performance on mobile.
  //           }}
  //           sx={{
  //             display: { xs: "block", sm: "none" },
  //             "& .MuiDrawer-paper": {
  //               boxSizing: "border-box",
  //               width: drawerWidth,
  //             },
  //           }}
  //         >
  //           <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
  //             <Typography variant="h6" sx={{ my: 2 }}>
  //               ARTISAN
  //             </Typography>
  //             <Divider />
  //             <List>
  //               <ListItem>
  //                 <ListItemButton sx={{ textAlign: "center" }}>
  //                   <IconButton
  //                     size="large"
  //                     aria-label="show 4 new mails"
  //                     color="inherit"
  //                   >
  //                     <Badge badgeContent={4} color="error">
  //                       <CommentOutlined />
  //                     </Badge>
  //                   </IconButton>
  //                   <p>Comments</p>
  //                 </ListItemButton>
  //               </ListItem>

  //               <ListItem>
  //                 <ListItemButton>
  //                   <IconButton
  //                     size="large"
  //                     aria-label="show 17 new notifications"
  //                     color="inherit"
  //                   >
  //                     <Badge badgeContent={17} color="error">
  //                       <StarOutline />
  //                     </Badge>
  //                   </IconButton>
  //                   <p>Rating</p>
  //                 </ListItemButton>
  //               </ListItem>
  //               <ListItem disablePadding>
  //                 {/* <ListItemButton sx={{ textAlign: "center" }}>
  //                   <ListItemText primary="Logout" />
  //                 </ListItemButton> */}
  //                 <Button className="logout-btn">
  //                   Logout
  //                   <LogoutOutlined />
  //                 </Button>
  //               </ListItem>
  //             </List>
  //           </Box>
  //         </Drawer>
  //       </Box>
  //       <Box component="main">
  //         <Toolbar />
  //       </Box>
  //     </Box>
  //   );
  // }

  // return content;
}

export default Navbar;
