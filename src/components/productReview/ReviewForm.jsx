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
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReviews,
  submitReview,
} from "../../store/slices/products/reviewsSlice";

function ReviewForm({ productId, reviews }) {
  const [open, setOpen] = useState(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.feedback && newReview.rating === 0) return;
    if (newReview.rating === 0) {
      alert("Please provide a rating before submitting your review.");
      return;
    }
    dispatch(
      submitReview({
        productId,
        rating: newReview.rating,
        feedback: newReview.feedback,
        token,
      })
    ).then(() => {
      dispatch(fetchReviews(productId));
    });

    setNewReview({ rating: 0, feedback: "" });
    dispatch(fetchReviews(productId));
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

  if (user && !open)
    return (
      <Chip
        label="Write a review ✍🏻"
        variant="outlined"
        sx={{ fontSize: "1rem" }}
        onClick={() => setOpen(true)}
      />
    );

  // when open is true, render the review form
  return (
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
              onChange={handleChange}
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
  );
}

export default ReviewForm;
