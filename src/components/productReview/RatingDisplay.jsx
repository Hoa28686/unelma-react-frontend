import { Rating, Stack, Typography } from "@mui/material";
import React from "react";

function RatingDisplay({ rating }) {
  const numericRating = Number(rating);
  const displayRating = Number.isInteger(numericRating)
    ? numericRating
    : numericRating.toFixed(1);
  return (
    <Stack spacing={1} direction="row" alignItems="center">
      <Typography
        variant="body1"
        sx={{
          color: (theme) => theme.palette.text.primary,
          fontWeight: 500,
        }}
      >
        {!isNaN(displayRating) && displayRating > 0 ? displayRating : null}
      </Typography>
      <Rating
        name="half-rating"
        value={numericRating}
        precision={0.05}
        readOnly
      />
    </Stack>
  );
}

export default RatingDisplay;
