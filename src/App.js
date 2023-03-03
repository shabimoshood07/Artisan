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
import Signup from "./Pages/Signup";
import EditProfile from "./features/EditProfile/EditProfile";

function App() {
  const dispatch = useDispatch();
  const loginData = localStorage.getItem("login data");
  console.log(loginData);
  if (loginData === "null" || !loginData || loginData == undefined) {
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
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/search" element={<Search />} />
            <Route path="/details/:id" element={<ArtisanDetails />} />
            <Route path="/profile/:id" element={<ArtisanProfile />} />

            <Route path="/edit/:id" element={<EditProfile />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </StyledEngineProvider>
    </>
  );
}

export default App;
