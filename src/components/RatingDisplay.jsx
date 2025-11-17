import { Rating, Stack, Typography } from "@mui/material";
import React from "react";

function RatingDisplay({ rating }) {
  return (
    <Stack spacing={1} direction="row" alignItems="center" mb={1}>
      <Typography>{parseFloat(rating)}</Typography>
      <Rating
        name="custom-rating"
        value={parseFloat(rating)}
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
