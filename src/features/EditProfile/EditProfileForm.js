import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FileBase64 from "react-file-base64";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import { useUpdateProfileMutation } from "../api/apiSlice";

const EditProfileForm = ({ artisan }) => {
  const {
    email,
    about,
    address,
    businessName,
    profession,
    socials,
    profileImage,
  } = artisan;
  const [img, setImg] = useState(profileImage);

  const [updateProfile, { isLoading, data }] = useUpdateProfileMutation();

  const schema = yup.object({});

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const submit = async (data) => {
    console.log({
      ...data,
      profileImage: data?.profileImage?.base64,
      " socials.twitter": data.twitter,
      " socials.instagram": data.instagram,
      " socials.facebook": data.facebook,
    });
    // const updatedUser = await updateProfile(data);
    const updatedUser = await updateProfile({
      ...data,
      profileImage: data?.profileImage?.base64,
      "socials.twitter": data?.twitter,
      "socials.instagram": data?.instagram,
      "socials.facebook": data?.facebook,
    });
    console.log(updatedUser);
  };

  const getFiles = (files) => {
    console.log(files);
    setImg(files.base64);
    setValue("profileImage", files);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(submit)}>
      <TextField
        label="Business Name"
        variant="standard"
        fullWidth
        value={businessName}
        disabled
        margin="normal"
      />
      <TextField
        label="Email"
        variant="standard"
        fullWidth
        value={email}
        disabled
        margin="normal"
        sx={{ textTransform: "capitalize" }}
      />
      <TextField
        label="Profession"
        variant="standard"
        fullWidth
        value={profession}
        disabled
        margin="normal"
        sx={{ textTransform: "capitalize" }}
      />
      <TextField
        label="About"
        variant="standard"
        margin="normal"
        fullWidth
        defaultValue={about}
        multiline
        rows={5}
        {...register("about")}
      />
      <TextField
        label="Address"
        variant="standard"
        margin="normal"
        fullWidth
        defaultValue={address}
        {...register("address")}
      />
      <TextField
        label="Twitter"
        variant="standard"
        margin="normal"
        fullWidth
        defaultValue={socials.twitter}
        InputProps={{
          startAdornment: <InputAdornment position="start">@</InputAdornment>,
        }}
        {...register("twitter")}
      />
      <TextField
        label="Facebook"
        variant="standard"
        margin="normal"
        fullWidth
        defaultValue={socials.facebook}
        InputProps={{
          startAdornment: <InputAdornment position="start">@</InputAdornment>,
        }}
        {...register("facebook")}
      />
      <TextField
        label="Instagram"
        variant="standard"
        margin="normal"
        fullWidth
        defaultValue={socials.instagram}
        InputProps={{
          startAdornment: <InputAdornment position="start">@</InputAdornment>,
        }}
        {...register("instagram")}
      />
      <Box mt={2} sx={{ border: "solid" }}>
        <Typography m={1}>choose profile picture</Typography>
        <Box>
          <FileBase64 onDone={getFiles.bind(this)} />
          <Avatar src={img} sx={{ width: 150, height: 150, marginTop: 2 }} />
        </Box>
      </Box>
      <Button type="submit" className="btn">
        {isLoading ? <CircularProgress /> : "Submit"}
      </Button>
    </Box>
  );
};

export default EditProfileForm;


