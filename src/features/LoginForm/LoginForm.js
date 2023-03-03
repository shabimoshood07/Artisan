import React, { useState } from "react";
import { useLoginMutation } from "../api/apiSlice";
import { setUserCredentials, setLoggedInStatus } from "../authSlice/authSlice";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import "./style.css";
const LoginForm = () => {
  const dispatch = useDispatch();
  const [login, { isLoading, isSuccess }] = useLoginMutation();
  const [inputData, setInputData] = useState("");
  const [password, setPassword] = useState("");

  const schema = yup.object({
    email: yup.string().email().required("Please provide an email"),
    password: yup.string().required("Please provide a passsword"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const submit = async (data) => {
    const { email, password } = data;
    console.log(data);
    const res = await login({ data: email, password: password });
    console.log(res);
    if (res) {
      dispatch(setUserCredentials(res.data));
      dispatch(setLoggedInStatus(true));
    }
  };

  return (
    <div>
      <Box
        component="form"
        onSubmit={handleSubmit(submit)}
        sx={{
          // border: "solid",
          width: { xs: "90%", sm: "80%" },
          margin: "auto",
          minHeight: "80vh",
          maxWidth: "900px",
          background: "#fff",
        }}
      >
        <TextField
          label="Email"
          fullWidth
          variant="outlined"
          margin="normal"
          size="medium"
          {...register("email")}
          // sx={{border:"solid red"}}
        />
        <TextField
          label="Password"
          fullWidth
          variant="standard"
          margin="normal"
          type="password"
          {...register("password")}
          // sx={{
          //   "& fieldset": { border: 'none' },
          // }}
        />
        <Button type="submit" fullWidth>
          {isLoading ? (
            <>
              <CircularProgress />
              Loading...
            </>
          ) : (
            "submit"
          )}
        </Button>
        <Box>
          <Link>
            <Typography>forgot password?</Typography>
          </Link>
          <Link to="/signup">
            <Typography>Sign up</Typography>
          </Link>
        </Box>
      </Box>
    </div>
  );
};

export default LoginForm;
