import React, { useState } from "react";
import { TextField, Box, Button, Rating, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useAddCommentMutation, useAddRatingMutation } from "../api/apiSlice";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../authSlice/authSlice";

// CSS
import "./style.css";


const CommentForm = () => {
  const [rating, setRating] = useState(0);
  const { id: artisanId } = useParams();
  const dispatch = useDispatch();
  const [addComment, { isLoading }] = useAddCommentMutation();
  const [addRating] = useAddRatingMutation();
  const userId = useSelector(selectUserId);

  // SCHEMA TO VALIDATE FORM
  const schema = yup.object().shape({
    comment: yup.string().required("Review is required!").max(500),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      comment: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data, rating);
    const comm = await addComment({
      artisanId,
      userId,
      commentText: data.comment,
    });

    if (rating !== 0) {
      const rate = await addRating({
        artisanId,
        userId,
        ratingValue: rating,
      });
    }
    reset();
    setRating(0);
  };

  return (
    <Box
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        border: "solid 1px",
        my: 2,
        py: 2,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "",
      }}
    >
      <Box>
        <TextField
          id="outlined-helperText"
          label="Leave A Review"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          {...register("comment")}
          error={errors.comment?.message}
        />
        <Typography className="error-msg">{errors.comment?.message}</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: { xs: "center", sm: "flex-start" },
          gap: 2,
          my: 2,
          px:2,
        }}
      >
        <Typography component="legend">Add Rating</Typography>
        <Rating
          value={rating}
          onChange={(event, value) => setRating(value)}
          size="large"
          precision={0.5}
        />
      </Box>

      <input type="submit" className="submit-btn" />
    </Box>
  );
};

export default CommentForm;
