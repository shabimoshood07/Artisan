import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectLoggedInStatus,
  selectUserId,
  logout,
} from "../authSlice/authSlice";

import { useGetArtisanQuery } from "../api/apiSlice";
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
  Typography,
  Button,
  Avatar,
  MenuItem,
  Popover,
  Toolbar,
  Badge,
  Menu,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import {
  CommentOutlined,
  StarOutline,
  LogoutOutlined,
} from "@mui/icons-material";

import { Link } from "react-router-dom";

// useDispatch
import { useDispatch } from "react-redux";

// CSS
import "./style.css";

import NotificationPopup from "./NotificationPopup";
import zIndex from "@mui/material/styles/zIndex";

const drawerWidth = 240;

const ArtisanNav = (props) => {
  // select notifiaction element
  const notificationPopup = useRef();

  // Toggle notification
  const handleToggleNotification = () => {
    notificationPopup.current.classList.toggle("show-notification");
  };

  const dispatch = useDispatch();
  // User Credentials
  const artisanId = useSelector(selectUserId);

  // logged in status
  const isLoggedIn = useSelector(selectLoggedInStatus);

  const { data: artisan, isSuccess } = useGetArtisanQuery(artisanId);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // LOGOUT
  const handleLogout = () => {
    dispatch(logout());
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;
  let content;

  if (isLoggedIn && isSuccess) {
    content = (
      <Box
        sx={{
          display: "flex",
        }}
      >
        <CssBaseline />
        <AppBar component="nav" sx={{ background: "#001166" }}>
          <Toolbar
            sx={{
              width: { xs: "97%", md: "85%" },
              marginLeft: "auto",
              marginRight: "auto",
              justifyContent: "space-between",
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
              <Link to="/">ARTISAN</Link>
            </Typography>
            <Box
              sx={{
                display: {
                  // xs: "none"
                  sm: "block",
                },
              }}
            >
              <Button
                sx={{
                  display: {
                    xs: "none",
                    sm: "inline-flex",
                  },
                }}
              >
                <Avatar src={artisan.profileImage} alt={artisan.name} />
              </Button>
              <IconButton
                size="large"
                className="icon"
                onClick={handleToggleNotification}
              >
                <Badge badgeContent={artisan.unreadCount} color="error">
                  <CommentOutlined />
                </Badge>
              </IconButton>
              <IconButton size="large" className="icon" sx={{ mr: 2 }}>
                <Badge badgeContent={artisan.ratingsCount} color="error">
                  <StarOutline />
                </Badge>
              </IconButton>
              <Button
                className="logout-btn"
                onClick={handleLogout}
                sx={{
                  display: {
                    xs: "none",
                    sm: "inline-flex",
                  },
                }}
              >
                Logout
                <LogoutOutlined />
              </Button>
              <div className="notification" ref={notificationPopup}>
                <Box
                  sx={{
                    backgroundColor: "white",
                    width: "100%",
                    borderBottom: "solid 1px",
                    zIndex: 3,
                  }}
                >
                  <Typography align="center">Notifications</Typography>
                </Box>
                <Box
                  sx={{
                    scrollBehavior: "smooth",
                    overflowY: "scroll",
                    height: "296px",
                  }}
                >
                  <NotificationPopup />
                </Box>
              </div>
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

                <ListItem
                  disablePadding
                  className="list-items"
                  onClick={handleLogout}
                >
                  <Button className="logout-btn" onClick={handleLogout}>
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
};

export default ArtisanNav;
