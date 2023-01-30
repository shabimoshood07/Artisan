import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { selectToggleValue, toggle } from "./toggleSlice";
import { useSelector, useDispatch } from "react-redux";
import About from "./About";
import Contact from "./Contact";
import Comment from "./Comment";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const DetailsTab = ({ artisan }) => {
  const { about, comments } = artisan;


  useEffect(() => {
    dispatch(toggle(0));
  }, []);

  const dispatch = useDispatch();
  const toggleValue = useSelector(selectToggleValue);

  return (
    <Box
      sx={{ width: { lg: "50%", xs: "90% " }, border: "solid 1px #000729 " }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={toggleValue}
          onChange={(e, value) => {
            dispatch(toggle(value));
          }}
          aria-label="basic tabs example"
          variant="fullWidth"
        >
          <Tab label="about" {...a11yProps(0)} />
          <Tab label="contact" {...a11yProps(1)} />
          <Tab label="Comments" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={toggleValue} index={0}>
        <About about={about} />
      </TabPanel>
      <TabPanel value={toggleValue} index={1}>
        <Contact artisan={artisan} />
      </TabPanel>
      <TabPanel value={toggleValue} index={2}>
        <Comment />
      </TabPanel>
    </Box>
  );
};

export default DetailsTab;
