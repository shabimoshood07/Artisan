import React, { useState } from "react";
import { TextField, Box, Button, Rating, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useCommentMutation } from "../api/apiSlice";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../authSlice/authSlice";
const CommentForm = () => {
  const { id: artisanId } = useParams();
  const dispatch = useDispatch();
  const [comment, { isLoading }] = useCommentMutation();
  const userId = useSelector(selectUserId);
  const schema = yup.object().shape({
    comment: yup.string().required("comment is Required!").max(500),
    rating: yup.number().positive().integer(),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const doc = await comment({ artisanId, userId, commentText: data.comment });
    console.log(data);
    console.log(doc);
  };



  return (
    <Box
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ border: "solid 1px", my: 2, py: 2 }}
    >
      <TextField
        id="outlined-multiline-helperText"
        label="Comment"
        variant="outlined"
        fullWidth
        {...register("comment")}
        helperText="Not more than 500 words"
      />
      <Typography>{errors.comment?.message}</Typography>
      <Controller
        name="rating"
        control={control}
        defaultValue={3}
        rules={{ required: true }}
        render={({ field }) => (
          <Rating name="rating" onChange={field.onChange} />
        )}
      />
      <Typography>{errors.rating?.message}</Typography>

      <input type="submit" />
    </Box>
  );
};

export default CommentForm;
