import "./App.css";
import { Route, Routes } from "react-router-dom";

// use this inorder to avoid adding !important when overriding default styles
import { StyledEngineProvider } from "@mui/material/styles";

import Home from "./Pages/Home";
import Navbar from "./features/Navbar/Navbar";
import ProtectedRoute from "./features/Protectec Route/ProtectedRoute";
import Login from "./Pages/Login";
import Search from "./Pages/Search";

function App() {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />


          <Route element={<ProtectedRoute />}>
            <Route path="/search" element={<Search />} />
          </Route>


          
        </Routes>
      </StyledEngineProvider>
    </>
  );
}

export default App;
