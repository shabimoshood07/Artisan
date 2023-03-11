import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import FileBase64 from "react-file-base64";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useArtisanSignupMutation } from "../api/apiSlice";

import "yup-phone";
import { Link, useNavigate } from "react-router-dom";
import Notification from "../PopNotification/Notification";
import { useDispatch } from "react-redux";
import { setLoggedInStatus, setUserCredentials } from "../authSlice/authSlice";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const SignupForm = () => {
  const [img, setImg] = useState("");

  const [ArtisanSignup, { isLoading, isError, error, isSuccess }] =
    useArtisanSignupMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let phoneschema = yup.object().shape({
    phone: yup
      .string()
      .phone("NG", "Please enter a valid phone number")
      .required("A phone number is required"),
  });

  const schema = yup.object({
    name: yup.string().required("Please enter your full name"),
    email: yup.string().email("Invalid email").required("Please enter email"),
    businessName: yup.string().required("Please provide your business name"),
    about: yup
      .string()
      .required("Provide a clear description about what you do"),
    gender: yup.string().required("choose a gender"),
    profession: yup.string().required("Enter a profession"),
    address: yup.string().required("Provide the address of your business"),
    password: yup.string().required("Please provide a password").min(6),
    confirmPassword: yup
      .string()
      .required("please confirm your password")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    // profileImage: yup
    //   .mixed()
    //   .nullable()
    //   .required("A file is required")
    //   .test(
    //     "Fichier taille",
    //     "too large file",
    //     (file) => !file || (file && file.file.size <= 1024 * 1024)
    //   )
    //   .test(
    //     "format",
    //     "format file",
    //     (file) => !file || (file.type && SUPPORTED_FORMATS.includes(file.type))
    //   ),
    phoneNumber: yup
      .string()
      .required("Enter a phone number")
      .phone(
        "NG",
        "Please enter a valid phone number",
        "Please enter a valid phone number"
      ),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    // console.log({ ...data, profileImage: data.profileImage.base64 });
    const user = await ArtisanSignup(data);
    if (user) {
      dispatch(setUserCredentials(user));
      dispatch(setLoggedInStatus(true));
      navigate("/");
    }
    console.log(user);
  };

  const getFiles = (files) => {
    setValue("profileImage", files);
  };

  useEffect(() => {
    register("profileImage");
  }, [register]);

  return (
    <Container
      sx={{
        display: "flex",
        margin: "2rem auto",
        background: "#fff",
        borderRadius: "20px",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        flexDirection: { xs: "column", md: "row" },
        width: { xs: "95%", sm: "70%", md: "90%" },
        maxWidth: "900px",
        padding: { xs: "1rem", md: 0 },
        paddingRight: { md: "0" },
        paddingLeft: { md: "1rem" },
        overflow: "hidden",
      }}
      maxWidth="900px"
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
          message="Sign up successful, please login"
          severity="success"
          isError={isError}
          isSuccess={isSuccess}
        />
      )}
      <Box pb={2} sx={{ flex: "1" }}>
        <Typography color="#000729" variant="h4" my={2} align="center">
          Create an account
        </Typography>

        <Typography color="#000729" my={2} align="center">
          Already have an account? <Link to="/login">Sign in</Link>
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Full Name"
            id="standard-basic"
            variant="standard"
            fullWidth
            size="small"
            margin="normal"
            {...register("name")}
          />
          {errors.name?.message && (
            <p className="error-msg">{errors.name?.message}</p>
          )}
          <TextField
            label="Email"
            id="standard-basic"
            variant="standard"
            fullWidth
            size="small"
            margin="normal"
            {...register("email")}
          />
          {errors.email?.message && (
            <p className="error-msg">{errors.email?.message}</p>
          )}

          <TextField
            label="Phone Number"
            id="standard-basic"
            variant="standard"
            fullWidth
            size="small"
            margin="normal"
            {...register("phoneNumber")}
          />
          {errors.phoneNumber?.message && (
            <p className="error-msg">{errors.phoneNumber?.message}</p>
          )}
          <TextField
            label="Business Name"
            id="standard-basic"
            variant="standard"
            fullWidth
            size="small"
            margin="normal"
            {...register("businessName")}
          />
          {errors.businessName?.message && (
            <p className="error-msg">{errors.businessName?.message}</p>
          )}
          <TextField
            label="Address"
            id="standard-basic"
            variant="standard"
            fullWidth
            size="small"
            margin="normal"
            {...register("address")}
          />
          {errors.address?.message && (
            <p className="error-msg">{errors.address?.message}</p>
          )}
          <TextField
            label="Profession"
            id="standard-basic"
            variant="standard"
            fullWidth
            size="small"
            margin="normal"
            {...register("profession")}
          />
          {errors.profession?.message && (
            <p className="error-msg">{errors.profession?.message}</p>
          )}

          <TextField
            id="standard-select"
            select
            label="Gender"
            defaultValue=""
            SelectProps={{
              native: true,
            }}
            variant="standard"
            margin="normal"
            {...register("gender")}
          >
            <option value=""></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </TextField>
          {errors.gender?.message && (
            <p className="error-msg">{errors.gender?.message}</p>
          )}
          {/* SOCIALS */}

          {/* <Typography variant="h6">Socials</Typography>
          <FormControl fullWidth variant="standard">
            <InputLabel htmlFor="standard-adornment-amount">
              Facebook
            </InputLabel>
            <Input
              // id="standard-adornment-amount"
              startAdornment={
                <InputAdornment position="start">@</InputAdornment>
              }
            />
          </FormControl>
          <FormControl fullWidth variant="standard">
            <InputLabel htmlFor="standard-adornment-amount">Twitter</InputLabel>
            <Input
              // id="standard-adornment-amount"
              startAdornment={
                <InputAdornment position="start">@</InputAdornment>
              }
            />
          </FormControl>
          <FormControl fullWidth variant="standard">
            <InputLabel htmlFor="standard-adornment-amount">
              Instagram
            </InputLabel>
            <Input
              // id="standard-adornment-amount"
              startAdornment={
                <InputAdornment position="start">@</InputAdornment>
              }
            />
          </FormControl> */}

          <TextField
            id="standard-multiline-static"
            label="About"
            multiline
            rows={4}
            variant="standard"
            fullWidth
            margin="normal"
            {...register("about")}
          />
          {errors.about?.message && (
            <p className="error-msg">{errors.about?.message}</p>
          )}

          {/* <FileBase64 onDone={getFiles.bind(this)} />
          {errors.profileImage?.message && (
            <p>{errors.profileImage?.message}</p>
          )} */}

          <TextField
            id="standard-multiline-static"
            label="Password"
            variant="standard"
            fullWidth
            margin="normal"
            type="password"
            {...register("password")}
          />
          {errors.password?.message && (
            <p className="error-msg">{errors.password?.message}</p>
          )}
          <TextField
            id="standard-multiline-static"
            label="Confirm Password"
            variant="standard"
            fullWidth
            margin="normal"
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword?.message && (
            <p className="error-msg">{errors.confirmPassword?.message}</p>
          )}
          <Button type="submit" className="btn">
            {isLoading ? <CircularProgress size={15} /> : "Submit"}
          </Button>
        </Box>
      </Box>

      {/* IMAGE CONTAINER */}
      <Box
        sx={{
          flex: "1",
          background: "#000729",
          display: { xs: "none", md: "flex" },
        }}
      >
        <Typography
          align="center"
          variant="h4"
          color="#d32f2f"
          sx={{ margin: "auto" }}
        >
          A World of Artisans at Your Fingertips: Start Exploring Today
        </Typography>
      </Box>
    </Container>
  );
};

export default SignupForm;
