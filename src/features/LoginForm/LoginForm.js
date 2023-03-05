import React, { useState } from "react";
import { useLoginMutation } from "../api/apiSlice";
import { setUserCredentials, setLoggedInStatus } from "../authSlice/authSlice";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  CircularProgress,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
// import "./style.css";
const LoginForm = () => {
  const dispatch = useDispatch();
  const [login, { isLoading, isSuccess }] = useLoginMutation();

  const style = {
    "& label.Mui-focused": {
      color: "#000729",
      fontSize: "1.2rem",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#000729",
      },
    },
  };

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
        p={2}
        component="form"
        onSubmit={handleSubmit(submit)}
        sx={{
          // border: "solid",
          width: { xs: "90%", sm: "80%" },
          margin: "auto",
          marginTop: "1rem",
          minHeight: "80vh",
          maxWidth: "600px",
          background: "#fff",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          textTransform="uppercase"
          color="#000729"
        >
          Login
        </Typography>
        <TextField
          label="Email"
          fullWidth
          variant="standard"
          margin="normal"
          size="medium"
          {...register("email")}
          sx={style}
        />
        <TextField
          label="Password"
          fullWidth
          variant="standard"
          margin="normal"
          type="password"
          {...register("password")}
          sx={style}
          className="input"
        />
        <Button
          type="submit"
          fullWidth
          className="btn login-btn"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <CircularProgress size={15}  />
            </>
          ) : (
            "submit"
          )}
        </Button>
        <Box
          px={1}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            flexWrap: "wrap",
          }}
        >
          <Link>
            <Typography
              textTransform="capitalize"
              mt={2}
              // mb={2}
              color="#d32f2f"
              sx={{
                "&:hover": {
                  borderBottom: "solid 1px #000729",
                },
              }}
            >
              forgot password?
            </Typography>
          </Link>
        </Box>
        <Typography align="center" m={2}>
          Don't have an account
          <Link to="/signup">
            <Box
              color="#d32f2f"
              sx={{
                "&:hover": {
                  borderBottom: "solid 2px #000729",
                },
                display: "inline",
              }}
              ml={1}
            >
              Sign up
            </Box>
          </Link>
        </Typography>
      </Box>
    </div>
  );
};

export default LoginForm;
