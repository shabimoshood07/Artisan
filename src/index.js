import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Provider
import { Provider } from "react-redux";
// Api Provider
import { ApiProvider } from "@reduxjs/toolkit/query/react";

// import store
import { store } from "./features/store/store";

// import apiSlice
import { apiSlice } from "./features/api/apiSlice";

import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

  
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
