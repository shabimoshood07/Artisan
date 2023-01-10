import * as React from "react";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import { ToggleButton, Box } from "@mui/material";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { selectToggleValue, toggle } from "./toggleSlice";
import { useSelector, useDispatch } from "react-redux";

const Toggle = () => {
  const dispatch = useDispatch();

//   const [tab, setTab] = React.useState("left");

  const toggleValue = useSelector(selectToggleValue);

  console.log(toggleValue);

//   const handleAlignment = (event, newAlignment) => {
//     setTab(toggleValue);
//   };

  return (
    <Box sx={{ border: "solid red", width: "50%" }}>
      <ToggleButtonGroup
        value={toggleValue}
        exclusive
        onChange={(e, value) => dispatch(toggle( value))}
        // onChange={handleAlignment}
        aria-label="text alignment"
      >
        <ToggleButton value="left" aria-label="left aligned">
          <FormatAlignLeftIcon />
        </ToggleButton>
        <ToggleButton value="center" aria-label="centered">
          <FormatAlignCenterIcon />
        </ToggleButton>
        <ToggleButton value="right" aria-label="right aligned">
          <FormatAlignRightIcon />
        </ToggleButton>
        <ToggleButton value="justify" aria-label="justified" disabled>
          <FormatAlignJustifyIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default Toggle;
