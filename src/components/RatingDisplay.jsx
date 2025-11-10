import { Rating, Stack, Typography } from "@mui/material";
import React from "react";

function RatingDisplay({ rating }) {
  return (
    <Stack spacing={1} direction="row" alignItems="center" mb={1}>
      <Typography>{rating}</Typography>
      <Rating
        name="half-rating"
        defaultValue={rating}
        precision={0.05}
        readOnly
        sx={{
          "& .MuiRating-iconEmpty": {
            color: "text.secondary",
          },
        }}
      />
    </Stack>
  );
}

export default RatingDisplay;
