import {
  Box,
  Container,
  TextField,
  Typography,
  Input,
  InputAdornment,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FileBase64 from "react-file-base64";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useArtisanSignupMutation } from "../api/apiSlice";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

export const validateImageType = (value) => {
  if (value) {
    let type = value.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0];
    return SUPPORTED_FORMATS.includes(type);
  }
};
let FILE_SIZE = 1024 * 1024;
const SignupForm = () => {
  const [img, setImg] = useState("");

  const [ArtisanSignup, { isLoading, isError, error }] =
    useArtisanSignupMutation();
  const schema = yup.object({
    name: yup.string().required("Enter full name"),
    email: yup.string().email().required(),
    phoneNumber: yup.string(),
    businessName: yup.string(),
    about: yup.string(),
    gender: yup.string(),
    profession: yup.string(),
    address: yup.string(),
    password: yup.string().required().min(6),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    profileImage: yup
      .mixed()
      .nullable()
      .required("A file is required")
      .test(
        "Fichier taille",
        "too large file",
        ({ size }) => !size || (size && size.split("")[0] <= 1024 * 1024)
      )
      .test(
        "format",
        "format file",
        ({ type }) => !type || (type && SUPPORTED_FORMATS.includes(type))
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
    console.log({ ...data, profileImage: data.profileImage.base64 });
    const user = await ArtisanSignup({
      ...data,
      profileImage: data.profileImage.base64,
    });

    console.log(user);
  };

  // Callback~
  const getFiles = (files) => {
    // setValue("profileImage", files[0].base64);
    console.log(files[0]);
    setValue("profileImage", files[0]);

    // register("file", files[0].base64);
  };

  useEffect(() => {
    // register("profileImage");
    register("profileImage");
  }, [register]);

  return (
    <Container sx={{ border: "solid", display: "flex", alignItems: "center" }}>
      <Box sx={{ flex: "1" }}>
        <Typography variant="h4">Create an account</Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Fullname"
            id="standard-basic"
            variant="standard"
            fullWidth
            size="small"
            margin="normal"
            {...register("name")}
            error={errors.name?.message}
          />
          {errors.name?.message && <p>{errors.name?.message}</p>}
          <TextField
            label="Email"
            id="standard-basic"
            variant="standard"
            fullWidth
            size="small"
            margin="normal"
            {...register("email")}
          />
          {errors.email?.message && <p>{errors.name?.message}</p>}

          <TextField
            label="phone Number"
            id="standard-basic"
            variant="standard"
            fullWidth
            size="small"
            margin="normal"
            {...register("phoneNumber")}
          />
          {errors.phoneNumber?.message && <p>{errors.name?.message}</p>}
          <TextField
            label="Business name"
            id="standard-basic"
            variant="standard"
            fullWidth
            size="small"
            margin="normal"
            {...register("businessName")}
          />
          {errors.businessName?.message && <p>{errors.name?.message}</p>}
          <TextField
            label="Address"
            id="standard-basic"
            variant="standard"
            fullWidth
            size="small"
            margin="normal"
            {...register("address")}
          />
          {errors.address?.message && <p>{errors.name?.message}</p>}
          <TextField
            label="Profession"
            id="standard-basic"
            variant="standard"
            fullWidth
            size="small"
            margin="normal"
            {...register("profession")}
          />
          {errors.profession?.message && <p>{errors.name?.message}</p>}

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
          {errors.gender?.message && <p>{errors.name?.message}</p>}
          {/* SOCIALS */}

          <Typography variant="h6">Socials</Typography>
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
          </FormControl>

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
          {errors.about?.message && <p>{errors.name?.message}</p>}
          <FileBase64
            multiple={true}
            // onDone={() => {
            //   getFiles.bind(this);
            //   // {...register("name")}
            // }}
            onDone={getFiles.bind(this)}
          />
          {errors.profileImage?.message && (
            <p>{errors.profileImage?.message}</p>
          )}
          <TextField
            id="standard-multiline-static"
            label="Password"
            variant="standard"
            fullWidth
            margin="normal"
            type="password"
            {...register("password")}
          />
          {errors.password?.message && <p>{errors.name?.message}</p>}
          <TextField
            id="standard-multiline-static"
            label="Confirm Password"
            variant="standard"
            fullWidth
            margin="normal"
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword?.message && <p>{errors.name?.message}</p>}
          <Button type="submit">Submit</Button>
          {/* <input type="submit" className="submit-btn" /> */}
        </Box>
      </Box>

      {/* IMAGE CONTAINER */}
      <Box sx={{ flex: "1", border: "solid red", height: "fit-content" }}>
        <h1>Moshood</h1>
      </Box>
    </Container>
  );
};

export default SignupForm;

