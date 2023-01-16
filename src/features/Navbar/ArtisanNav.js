import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  selectLoggedInStatus,
  selectUserCredentials,
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

import { Link } from "react-router-dom";

// useDispatch
import { useDispatch } from "react-redux";

// CSS
import "./style.css";

const drawerWidth = 240;

function ArtisanNav(props) {
  const dispatch = useDispatch();
  // User Credentials
  const { username, token, role, email, id, name } = useSelector(
    selectUserCredentials
  );

  // logged in status
  const isLoggedIn = useSelector(selectLoggedInStatus);

  const { data: artisan, isSuccess } = useGetArtisanQuery(id);
  // const { data: artisans, isSuccess } = useGetAllArtisansQuery();

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
    console.log(artisan);
    
    content = (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          component="nav"
          sx={{
            background: "#001166",
          }}
        >
          <Toolbar
            sx={{
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
              <Link to="/">ARTISAN</Link>
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Button>
                <Avatar src={artisan.profileImage} alt={artisan.name} />
              </Button>
              <IconButton size="large" className="icon">
                <Badge badgeContent={artisan.unreadCount} color="error">
                  <CommentOutlined />
                </Badge>
              </IconButton>
              <IconButton size="large" className="icon" sx={{ mr: 2 }}>
                <Badge badgeContent={17} color="error">
                  <StarOutline />
                </Badge>
              </IconButton>
              <Button className="logout-btn" onClick={handleLogout}>
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
                <ListItem
                  disablePadding
                  className="list-items"
                  onClick={handleLogout}
                >
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
