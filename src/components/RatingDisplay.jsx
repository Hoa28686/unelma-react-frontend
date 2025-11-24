import { Rating, Box } from "@mui/material";
import React, { useState } from "react";

function RatingDisplay({ rating, onRatingChange, productId, disabled = false }) {
  const numericRating = parseFloat(rating);
  const displayRating = isNaN(numericRating) ? 0 : numericRating;
  const [userRating, setUserRating] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // If onRatingChange is provided, make it interactive (for logged-in users)
  const isInteractive = !!onRatingChange && !disabled;
  
  const handleRatingChange = async (event, newValue) => {
    if (!isInteractive || !newValue) return;
    
    setUserRating(newValue);
    setIsSubmitting(true);
    
    try {
      await onRatingChange(productId, newValue);
    } catch (error) {
      console.error("Failed to submit rating:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <Rating
        name="custom-rating"
        value={isInteractive && userRating !== null ? userRating : displayRating}
        precision={isInteractive ? 1 : 0.05}
        readOnly={!isInteractive || isSubmitting}
        onChange={handleRatingChange}
        disabled={isSubmitting}
        size="small"
        sx={{
          fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
          "& .MuiRating-iconFilled": { color: "#FFD700" },
          "& .MuiRating-iconEmpty": {
            color: "#C0C0C0",
          },
          cursor: isInteractive ? "pointer" : "default",
        }}
      />
    </Box>
  );
}

export default RatingDisplay;
