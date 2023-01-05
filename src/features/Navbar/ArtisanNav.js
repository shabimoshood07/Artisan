import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectLoggedInStatus,
  selectUserCredentials,
} from "../authSlice/authSlice";

import { useGetAllArtisansQuery } from "../api/apiSlice";
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
  MenuItem,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  CommentOutlined,
  StarOutline,
  LogoutOutlined,
} from "@mui/icons-material";

import "./style.css";

const drawerWidth = 240;
let navItems = ["Login", "Sign Up"];

function ArtisanNav(props) {
  // User Credentials
  const { user, token, role, email } = useSelector(selectUserCredentials);
  // logged in status
  const isLoggedIn = useSelector(selectLoggedInStatus);

  const { data: artisans, isSuccess } = useGetAllArtisansQuery();

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;
  let content;

  if (isLoggedIn && isSuccess) {
    const artisan = artisans.find((artisan) => artisan.email == email);
    content = (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          component="nav"
          sx={{
            // border: "solid red",
            background: "#001166",
          }}
        >
          <Toolbar
            sx={{
              // border: "solid yellow",
              width: { xs: "97%", md: "85%" },
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
              className="icon"
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
              <Button>
                <Avatar src={artisan.profileImage} alt={artisan.name} />
              </Button>
              <IconButton size="large" className="icon">
                <Badge badgeContent={4} color="error">
                  <CommentOutlined />
                </Badge>
              </IconButton>
              <IconButton size="large" className="icon" sx={{ mr: 2 }}>
                <Badge badgeContent={17} color="error">
                  <StarOutline />
                </Badge>
              </IconButton>
              <Button className="logout-btn">
                Logout
                <LogoutOutlined />
              </Button>
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
            <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
              <Typography variant="h6" sx={{ my: 2 }}>
                ARTISAN
              </Typography>
              <Divider />
              <List>
                <ListItem className="list-items">
                  <ListItemButton
                    sx={{ textAlign: "center", justifyContent: "center" }}
                  >
                    <Avatar src={artisan.profileImage} />
                    <p>Profile</p>
                  </ListItemButton>
                </ListItem>
                <ListItem className="list-items">
                  <ListItemButton
                    sx={{ textAlign: "center", justifyContent: "center" }}
                  >
                    <IconButton
                      size="large"
                      aria-label="show 4 new mails"
                      color="inherit"
                    >
                      <Badge badgeContent={4} color="error">
                        <CommentOutlined />
                      </Badge>
                    </IconButton>
                    <p>Comments</p>
                  </ListItemButton>
                </ListItem>

                <ListItem className="list-items">
                  <ListItemButton sx={{ justifyContent: "center" }}>
                    <IconButton
                      size="large"
                      aria-label="show 17 new notifications"
                      color="inherit"
                    >
                      <Badge badgeContent={17} color="error">
                        <StarOutline />
                      </Badge>
                    </IconButton>
                    <p>Rating</p>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding className="list-items">
                  <Button className="logout-btn">
                    Logout
                    <LogoutOutlined />
                  </Button>
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </Box>
        <Box component="main">
          <Toolbar />
        </Box>
      </Box>
    );
  }

  return content;
}

export default ArtisanNav;
