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
import { fetchPurchases } from "../../store/slices/products/purchasesSlice";

function ReviewForm({ product, reviews }) {
  const [open, setOpen] = useState(false);
  const { user, token } = useAuth();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.reviews.loading);
  const purchasedProducts = useSelector((state) => state.purchases.items);
  const purchasesLoading = useSelector((state) => state.purchases.loading);
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

  useEffect(() => {
    if (purchasedProducts.length === 0) {
      dispatch(fetchPurchases(token));
    }
  }, [token, purchasedProducts, dispatch]);

  const hasPurchased = purchasedProducts?.some(
    (p) => p.stripe_price_id === product.stripe_price_id
  );

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
      rating: newValue || 0,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.feedback && newReview.rating === 0) return;
    if (newReview.rating === 0) {
      alert("Please provide a rating before submitting your review.");
      return;
    }

    try {
      dispatch(
        submitReview({
          productId: product.id,
          rating: newReview.rating,
          feedback: newReview.feedback,
          token,
        })
      );

      // Success
      setNewReview({ rating: 0, feedback: "" });
      dispatch(fetchReviews(product.id));
    } catch {
      alert("An unexpected error occurred. Please try again.");
    }
  };

  // Already reviewed -> hide form
  if (reviewedUsers.includes(user?.id)) return null;

  // Not logged in
  if (!user)
    return (
      <Typography variant="subtitle1" sx={{ color: "text.primary", my: 2 }}>
        Log in to write a review
      </Typography>
    );
  if (user && !hasPurchased) return null;

  // Show chip to open form

  if (user && !open && hasPurchased)
    return (
      <Chip
        label={purchasesLoading ? "Checking purchases..." : "Write a review ✍🏻"}
        variant="outlined"
        sx={{ fontSize: "1rem" }}
        onClick={() => setOpen(true)}
      />
    );

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
          sx={{ textTransform: "none", position: "absolute", top: 8, right: 8 }}
          onClick={() => setOpen(false)}
        >
          Cancel ❌
        </Button>

        <form onSubmit={handleSubmit}>
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <Avatar
              alt={user.name}
              src={user.profile_picture || "/logo.webp"}
              sx={{ width: { xs: 32, sm: 40 }, height: { xs: 32, sm: 40 } }}
            />
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {user.name}
            </Typography>
          </Stack>

          <Stack direction="column" spacing={2} sx={{ flex: 1 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
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
              disabled={
                loading ||
                (newReview.feedback.trim() === "" && newReview.rating === 0)
              }
              variant="contained"
              sx={{ textTransform: "none" }}
            >
              Submit review
            </Button>
          </Stack>
        </form>
      </Paper>
    </>
  );
}

export default ReviewForm;
