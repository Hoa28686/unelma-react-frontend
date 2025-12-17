import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../../api";
import axios from "axios";

const initialState = {
  reviews: [],
  averageRating: 0,
  ratingCount: 0,
  loading: false,
  error: null,
};

const productAPI = API.products;
const submitReviewAPI = `${productAPI}/rate`;

// fetch all reviews for a product
export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async (productId) => {
    const res = await axios.get(`${productAPI}/${productId}/ratings`);
    return res.data.data;
  }
);

export const submitReview = createAsyncThunk(
  "reviews/submitReview",
  async ({ productId, rating, feedback, token }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        submitReviewAPI,
        { productId, rating, feedback },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data.data.rating;
    } catch (err) {
      return rejectWithValue({
        message: err.response?.data?.message || err.message,
        status: err.response?.status,
      });
    }
  }
);

export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async ({ review, token }, { rejectWithValue }) => {
    try {
      await axios.delete(`${productAPI}/${review.product_id}/ratings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return review.id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload.ratings;
        state.averageRating = action.payload.average_rating;
        state.ratingCount = action.payload.rating_count;
        state.loading = false;
      })

      //add new review or edit an existing review
      .addCase(submitReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitReview.fulfilled, (state, action) => {
        state.loading = false;
        //remove the existing review by the same user if any
        const updatedReview = action.payload;
        state.reviews = state.reviews.filter(
          (r) => r.user_id !== updatedReview.user_id
        );
        state.reviews.unshift(updatedReview);
      })
      .addCase(submitReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //delete a review
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter(
          (review) => review.id !== action.payload
        );
        state.loading = false;
      });
  },
});

export default reviewsSlice.reducer;
