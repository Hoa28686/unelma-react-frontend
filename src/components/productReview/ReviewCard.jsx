import React, { useState } from "react";
import { getImageUrl, timeConversion } from "../../helpers/helpers";
import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Rating,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { useAuth } from "../../context/AuthContext";
import { useDispatch } from "react-redux";
import {
  deleteReview,
  fetchReviews,
  submitReview,
} from "../../store/slices/products/reviewsSlice";
import ParagraphText from "../blog/ParagraphText";

function ReviewCard({ review }) {
  const { user, token } = useAuth();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isEditing, setIsEditing] = useState(false);
  const [editedReview, setEditedReview] = useState({
    rating: review.rating,
    feedback: review.feedback,
  });

  const handleEdit = () => {
    setIsEditing(true);
    setAnchorEl(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editedReview.feedback && editedReview.rating === 0) return;
    dispatch(
      submitReview({
        productId: review.product_id,
        rating: editedReview.rating,
        feedback: editedReview.feedback,
        token,
      })
    ).then(() => {
      dispatch(fetchReviews(review.product_id));
    });

    setIsEditing(false);
  };
  const handleDelete = () => {
    setAnchorEl(null);
    if (confirm("Are you sure you want to delete this review?")) {
      dispatch(deleteReview({ review, token })).then(() => {
        dispatch(fetchReviews(review.product_id));
      });
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack spacing={2} mb={3} direction="row">
      <Avatar
        src={
          review.user.profile_picture ||
          getImageUrl(review.user.profile_picture) ||
          `/logo.webp`
        }
        alt="user avatar"
        sx={{
          width: { xs: 32, sm: 40 },
          height: { xs: 32, sm: 40 },
          flexShrink: 0,
        }}
      />

      <Stack spacing={1} flex={1} direction="column">
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              color: (theme) => theme.palette.text.primary,
            }}
          >
            {review.user.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: (theme) => theme.palette.text.secondary,
            }}
          >
            {timeConversion(review.created_at)}
          </Typography>

          {/* Edit and delete options */}
          {user?.id === review.user_id && !isEditing && (
            <IconButton
              onClick={(e) => {
                setAnchorEl(e.currentTarget);
              }}
            >
              <MoreVertIcon />
            </IconButton>
          )}

          {anchorEl && (
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={handleEdit}>Edit</MenuItem>
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
          )}
        </Stack>

        {/* Default review info */}
        {!isEditing && (
          <>
            <Rating value={review?.rating} readOnly />
            <ParagraphText text={review?.feedback} />
          </>
        )}

        {/* Editing form */}
        {isEditing && (
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <Rating
                name="rating"
                value={editedReview.rating}
                precision={1}
                onChange={handleChange}
              />
              <TextField
                multiline
                minRows={2}
                fullWidth
                name="feedback"
                placeholder="Add feedback..."
                value={editedReview.feedback ?? ""}
                onChange={handleChange}
              />
              <Stack direction="row" spacing={1} justifyContent="flex-end">
                <Chip
                  label="Cancel"
                  onClick={() => setIsEditing(false)}
                  variant="outlined"
                />
                <Chip
                  label="Send"
                  component="button"
                  type="submit"
                  disabled={
                    editedReview?.feedback?.trim() ===
                      review.feedback?.trim() &&
                    editedReview.rating === review.rating
                  }
                  sx={{
                    backgroundColor: (theme) => theme.palette.primary.main,
                  }}
                />
              </Stack>
            </Stack>
          </form>
        )}
      </Stack>
    </Stack>
  );
}

export default ReviewCard;
