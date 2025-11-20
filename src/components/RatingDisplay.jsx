import { Rating, Stack, Typography } from "@mui/material";
import React from "react";

function RatingDisplay({ rating }) {
  const numericRating = parseFloat(rating);
  const displayRating = isNaN(numericRating) ? 0 : numericRating;
  
  return (
    <Stack spacing={1} direction="row" alignItems="center" mb={1}>
      <Typography>{displayRating}</Typography>
      <Rating
        name="custom-rating"
        value={displayRating}
        precision={0.05}
        readOnly
        sx={{
          "& .MuiRating-iconFilled": { color: "#FFD700" },
          "& .MuiRating-iconEmpty": {
            color: "#C0C0C0",
          },
        }}
      />
    </Stack>
  );
}

export default RatingDisplay;
