import React, { useState } from "react";
import { TextField, Box, Button, Rating } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const CommentForm = () => {
  const schema = yup.object().shape({
    comment: yup.string().required("comment is Required!"),
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

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box
      component="form"
      autoComplete="off"
      // onSubmit={handleSubmit(onSubmit)}
      onSubmit={handleSubmit((data) => onSubmit(data))}
      sx={{ border: "solid 1px", my: 2, py: 2 }}
    >
      <TextField
        id="outlined-helperText"
        label="Comment"
        variant="outlined"
        {...register("comment")}
        helperText="Not more than 500 words"
      />
      <Controller
        name="rating"
        control={control}
        defaultValue={3}
        rules={{ required: true }}
        render={({ field }) => (
          <Rating
            name="rating"
            // value={Number(props.value)}
            onChange={field.onChange}
          />
        )}
      />

      <input type="submit" />
    </Box>
  );
};

export default CommentForm;
