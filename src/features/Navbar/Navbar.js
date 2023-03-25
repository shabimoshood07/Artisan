import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectLoggedInStatus, selectUserRole } from "../authSlice/authSlice";

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

// Import the different navs
import ArtisanNav from "./ArtisanNav";
import USerNav from "./UserNav";
import "./style.css";
import { Link } from "react-router-dom";

const drawerWidth = 240;
const navItems = ["login", "Sign Up"];

let Navbar = (props) => {
  // User Credentials
  const role = useSelector(selectUserRole);

  // logged in status
  const isLoggedIn = useSelector(selectLoggedInStatus);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Link to="/">
        <Typography variant="h6" sx={{ my: 2 }}>
          ARTISAN
        </Typography>
      </Link>
      <Divider />
      <List>
        <Link to="/login">
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="Login" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/signup">
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="Sign up" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  let content;
  if (isLoggedIn && role == "artisan") {
    return <ArtisanNav />;
  }
  if (isLoggedIn && role == "user") {
    return <USerNav />;
  }

  return (
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
                xs: "none",
                sm: "flex",
                gap: 10,
                alignItems: "center",
              },
            }}
            className="con"
          >
            <Button
              className="btn"
              sx={{
                color: "#fff",
                "&.btn": {
                  marginTop: 0,
                  width: "fit-content",
                },
              }}
            >
              <Link to="/login">Login</Link>
            </Button>
            <Button
              className="btn"
              sx={{
                color: "#fff",
                "&.btn": {
                  marginTop: 0,
                  width: "fit-content",
                },
              }}
            >
              <Link to="/signup">Sign up</Link>
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
            keepMounted: true,
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
};

export default Navbar;
