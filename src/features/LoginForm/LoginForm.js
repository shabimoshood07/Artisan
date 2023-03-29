import React from "react";
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
import { Link, useNavigate } from "react-router-dom";
import Notification from "../PopNotification/Notification";
const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading, isSuccess, data: loginData, isError, error }] =
    useLoginMutation();

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
    inputData: yup.string().required("Please provide email or username"),
    password: yup.string().required("Please provide  passsword"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const submit = async (data) => {
    const { inputData, password } = data;
    const response = await login({ data: inputData, password: password });
    console.log(response);
    if (response.data) {
      setTimeout(() => {
        dispatch(setUserCredentials(response.data));
        dispatch(setLoggedInStatus(true));
        navigate("/");
      }, 2000);
    }
  };

  return (
    <div>
      <Box
        p={2}
        component="form"
        onSubmit={handleSubmit(submit)}
        sx={{
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
        {isError && (
          <Notification
            message={error?.data?.message}
            severity="error"
            isError={isError}
            isSuccess={isSuccess}
          />
        )}
        {isSuccess && (
          <Notification
            message="Login successful"
            severity="success"
            isError={isError}
            isSuccess={isSuccess}
          />
        )}

        <Typography
          variant="h4"
          align="center"
          textTransform="uppercase"
          color="#000729"
        >
          Login
        </Typography>
        <TextField
          label="Email/Username"
          fullWidth
          variant="standard"
          margin="normal"
          size="medium"
          {...register("inputData")}
          sx={style}
        />
        {errors?.email?.message && (
          <Typography variant="p" color="red">
            {errors.email.message}
          </Typography>
        )}
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
        {errors?.password?.message && (
          <Typography variant="p" color="red">
            {errors.password.message}
          </Typography>
        )}
        <Button
          type="submit"
          fullWidth
          className="btn login-btn"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <CircularProgress size={15} />
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
