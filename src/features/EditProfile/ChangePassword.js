import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useChangePasswordMutation } from "../api/apiSlice";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./style.css";
import Notification from "../PopNotification/Notification";
const ChangePassword = () => {
  const [changePassword, { isLoading, isSuccess, data, isError }] =
    useChangePasswordMutation();

  const schema = yup.object({
    currentPassword: yup
      .string()
      .required("Please input your current password"),
    newPassword: yup
      .string()
      .required("Please input your new password")
      .min(6, "password must be at least 6 characters"),
    confirmPassword: yup
      .string()
      .required("please confirm your password")
      .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const submit = async (data) => {
    const response = await changePassword({
      newPassword: data?.newPassword,
      currentPassword: data?.currentPassword,
    });

    console.log(response);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(submit)}>
      {isSuccess && (
        <Notification
          message="password updated successfully"
          severity="success"
          isError={isError}
          isSuccess={isSuccess}
        />
      )}
      {isError && (
        <Notification
          message="Error"
          severity="error"
          isError={isError}
          isSuccess={isSuccess}
        />
      )}
      <TextField
        fullWidth
        margin="normal"
        label="current password"
        {...register("currentPassword")}
        type="password"
      />
      {errors?.currentPassword?.message && (
        <Typography color="red" variant="p">
          {errors.currentPassword.message}
        </Typography>
      )}
      <TextField
        fullWidth
        margin="normal"
        label="new password"
        {...register("newPassword")}
        type="password"
      />
      {errors?.newPassword?.message && (
        <Typography color="red" variant="p">
          {errors.newPassword.message}
        </Typography>
      )}
      <TextField
        fullWidth
        margin="normal"
        label="confirm password"
        {...register("confirmPassword")}
        type="password"
      />
      {errors?.confirmPassword?.message && (
        <Typography color="red" variant="p">
          {errors.confirmPassword.message}
        </Typography>
      )}
      <Button type="submit" className="btn" disabled={isLoading}>
        {isLoading ? <CircularProgress size={15} /> : "Submit"}
      </Button>
    </Box>
  );
};

export default ChangePassword;
