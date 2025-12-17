import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  Button,
  Chip,
  Paper,
  Rating,
  Stack,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReviews,
  submitReview,
} from "../../store/slices/products/reviewsSlice";

function ReviewForm({ productId, reviews }) {
  const [open, setOpen] = useState(false);
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);
  const { user, token } = useAuth();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.reviews.loading);
  const [newReview, setNewReview] = useState({
    rating: 0,
    feedback: "",
  });

  const reviewedUsers = reviews.map((review) => review.user_id);

  useEffect(() => {
    if (reviewedUsers.includes(user?.id)) {
      setOpen(false);
    }
  }, [reviewedUsers, user]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleRatingChange = (event, newValue) => {
    setNewReview((prevReview) => ({
      ...prevReview,
      rating: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.feedback && newReview.rating === 0) return;
    if (newReview.rating === 0) {
      alert("Please provide a rating before submitting your review.");
      return;
    }
    
    try {
      const result = await dispatch(
        submitReview({
          productId,
          rating: newReview.rating,
          feedback: newReview.feedback,
          token,
        })
      );
      
      // Check if the action was rejected (error from backend)
      if (submitReview.rejected.match(result)) {
        const error = result.payload;
        // Error structure: { data: err.response?.data, status: err.response?.status }
        const errorStatus = error?.status;
        const errorData = error?.data || error;
        
        // Extract error message from various possible structures
        let errorMessage = '';
        if (typeof errorData === 'string') {
          errorMessage = errorData;
        } else if (errorData?.message) {
          errorMessage = errorData.message;
        } else if (errorData?.error) {
          errorMessage = errorData.error;
        } else if (errorData?.detail) {
          errorMessage = errorData.detail;
        }
        
        const lowerMessage = errorMessage.toLowerCase();
        
        // Check if it's a 400 error (purchase required)
        if (errorStatus === 400 || 
            lowerMessage.includes('purchase') || 
            lowerMessage.includes('buy') ||
            lowerMessage.includes('must purchase') ||
            lowerMessage.includes('not purchased')) {
          setPurchaseDialogOpen(true);
          return;
        }
        // Handle other errors
        alert(errorMessage || "Failed to submit review. Please try again.");
        return;
      }
      
      // Success - reset form and refresh reviews
      setNewReview({ rating: 0, feedback: "" });
      dispatch(fetchReviews(productId));
    } catch (error) {
      // Fallback error handling
      alert("An error occurred. Please try again.");
    }
  };

  //if already reviewed, do not show the form
  if (reviewedUsers.includes(user?.id)) return null;

  // if not logged in, prompt to log in
  if (!user)
    return (
      <Typography
        variant="subtitle1"
        sx={{
          color: (theme) => theme.palette.text.primary,
          my: 2,
          fontSize: { xs: "1.125rem", sm: "1.25rem" },
        }}
      >
        Log in to write a review
      </Typography>
    );

  if (user && !open) {
    return (
      <Chip
        label="Write a review ✍🏻"
        variant="outlined"
        sx={{ fontSize: "1rem" }}
        onClick={() => setOpen(true)}
      />
    );
  }

  // when open is true, render the review form
  return (
    <>
      <Paper
        sx={{
          p: 2,
          mb: 4,
          width: { xs: "100%", md: "80%" },
          mx: "auto",
          position: "relative",
        }}
        elevation={3}
      >
      <Button
        sx={{
          textTransform: "none",
          position: "absolute",
          top: 8,
          right: 8,
          color: (theme) => theme.palette.text.secondary,
        }}
        onClick={() => setOpen(false)}
      >
        Cancel ❌
      </Button>
      <form onSubmit={handleSubmit}>
        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
          <Avatar
            alt={user.name}
            src={user.profile_picture || "/logo.webp"}
            sx={{
              width: { xs: 32, sm: 40 },
              height: { xs: 32, sm: 40 },
            }}
          />
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {user.name}
          </Typography>
        </Stack>
        <Stack direction="column" spacing={2} sx={{ flex: 1 }}>
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Typography
              variant="body2"
              sx={{ color: (theme) => theme.palette.text.secondary }}
            >
              Item rating<span style={{ color: "red" }}>*</span>
            </Typography>

            <Rating
              name="rating"
              value={newReview.rating}
              precision={1}
              onChange={handleRatingChange}
            />
          </Stack>
          <TextField
            multiline
            minRows={2}
            fullWidth
            name="feedback"
            placeholder="Add feedback..."
            value={newReview.feedback}
            onChange={handleChange}
          />

          <Button
            type="submit"
            aria-label="Send"
            disabled={
              loading ||
              (newReview.feedback?.trim() === "" && newReview.rating === 0)
            }
            variant="contained"
            sx={{
              textTransform: "none",
            }}
          >
            Submit review
          </Button>
        </Stack>
      </form>
    </Paper>
    <Dialog
      open={purchaseDialogOpen}
      onClose={() => setPurchaseDialogOpen(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Purchase Required</DialogTitle>
      <DialogContent>
        <Typography>
          You must purchase this product before you can rate or review it.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setPurchaseDialogOpen(false)} variant="contained">
          OK
        </Button>
      </DialogActions>
    </Dialog>
    </>
  );
}

export default ReviewForm;
