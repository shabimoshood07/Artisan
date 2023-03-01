import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, CircularProgress } from "@mui/material";
import EditProfileForm from "./EditProfileForm";
import { useSelector } from "react-redux";
import { useGetArtisanQuery } from "../api/apiSlice";
import { selectUserId } from "../authSlice/authSlice";
import "./style.css";
import ChangePassword from "./ChangePassword";
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index) => {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
};

export default function EditProfile() {
  const artisanId = useSelector(selectUserId);
  const {
    isLoading,
    isSuccess,
    data: artisan,
    error,
    currentData,
  } = useGetArtisanQuery(artisanId);

  let { state } = useLocation();
  const naviagte = useNavigate();
  useEffect(() => {
    if (!state?.access) {
      naviagte("/login");
    }
  }, []);
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let content;

  if (isLoading) {
    content = <CircularProgress />;
  }

  if (artisan) {
    content = (
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          width: { xs: "90%", md: "80%" },
          margin: "1rem auto",
          maxWidth: "1000px",
          position: "relative",
        }}
      >
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          sx={{
            borderBottom: "solid 1px",
            borderRight: 1,
            borderColor: "divider",
            flexDirection: { xs: "row", md: "column" },
            minWidth: { sm: "200px" },
            position: "sticky",
            top: "50px",
            zIndex: "99",
            background: "#fff",
          }}
          className="tabs"
        >
          <Tab label={<Avatar>MO</Avatar>} disabled />
          <Tab label="Edit Profile" {...a11yProps(1)} />
          <Tab label="Change Password" {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={value} index={0} children={<Avatar>MO</Avatar>} />
        {artisan && (
          <TabPanel
            value={value}
            index={1}
            children={<EditProfileForm artisan={artisan} />}
          />
        )}
        <TabPanel value={value} index={2} children={<ChangePassword />} />
      </Box>
    );
  }
  return content;
}
