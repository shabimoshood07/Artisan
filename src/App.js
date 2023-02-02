import "./App.css";
import { Route, Routes } from "react-router-dom";

// use this inorder to avoid adding !important when overriding default styles
import { StyledEngineProvider } from "@mui/material/styles";

import Home from "./Pages/Home";
import Navbar from "./features/Navbar/Navbar";
import ProtectedRoute from "./features/Protectec Route/ProtectedRoute";
import Login from "./Pages/Login";
import Search from "./Pages/Search";
import ArtisanDetails from "./Pages/ArtisanDetails";
import ArtisanProfile from "./Pages/ArtisanProfile";

import { useDispatch } from "react-redux";
import {
  setUserCredentials,
  setLoggedInStatus,
} from "./features/authSlice/authSlice";
import ErrorPage from "./Pages/ErrorPage";

function App() {
  const dispatch = useDispatch();
  const loginData = localStorage.getItem("login data");
  if (loginData === "null") {
    dispatch(setLoggedInStatus(false));
  } else {
    dispatch(setUserCredentials(JSON.parse(loginData)));
    dispatch(setLoggedInStatus(true));
  }

  return (
    <>
      <StyledEngineProvider injectFirst>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/search" element={<Search />} />
            <Route path="/details/:id" element={<ArtisanDetails />} />
            <Route path="/profile/:id" element={<ArtisanProfile />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </StyledEngineProvider>
    </>
  );
}

export default App;
