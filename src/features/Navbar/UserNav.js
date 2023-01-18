import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectLoggedInStatus,
  selectUsername,
  logout,
} from "../authSlice/authSlice";

import { useGetAllUsersQuery } from "../api/apiSlice";
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
import { useDispatch } from "react-redux";
import "./style.css";

const drawerWidth = 240;

const USerNav = (props) => {
  const dispatch = useDispatch();

  // User Credentials
  const username  = useSelector(selectUsername);
  // logged in status
  const isLoggedIn = useSelector(selectLoggedInStatus);

  const { data: users, isSuccess } = useGetAllUsersQuery();

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
 
    const user = users.find(
      (user) => user.username.toLowerCase() == username.toLowerCase()
    );
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
              <Button sx={{ marginRight: "2rem", border: "solid 1px #d7c1ce" }}>
                <Typography
                  sx={{
                    color: "#d7c1ce",
                    textTransform: "capitalize",
                    marginRight: "10px",
                  }}
                >
                  View Profile
                </Typography>
                <Avatar alt={user.username}>{`${username.charAt(
                  0
                )} ${username.charAt(2)}`}</Avatar>
              </Button>
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
                  <ListItemButton sx={{ justifyContent: "center" }}>
                    <Avatar
                      alt={user.username}
                      sx={{ marginRight: "1rem", textTransform: "uppercase" }}
                    >
                      {`${username.charAt(0)} ${username.charAt(2)}`}
                    </Avatar>
                    <p>View Profile</p>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding className="list-items">
                  <Button
                    className="logout-btn"
                    sx={{ marginLeft: "0", width: "50%" }}
                    onClick={handleLogout}
                  >
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


export default USerNav;
