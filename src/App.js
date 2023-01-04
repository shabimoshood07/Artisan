import "./App.css";
import { Route, Routes } from "react-router-dom";

// use this inorder to avoid adding !important when overriding default styles
import { StyledEngineProvider } from "@mui/material/styles";

import Home from "./Pages/Home";
import Navbar from "./features/Navbar/Navbar";
function App() {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </StyledEngineProvider>
    </>
  );
}

export default App;
