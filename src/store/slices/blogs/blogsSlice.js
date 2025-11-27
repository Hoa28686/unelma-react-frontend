import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../../api";
import { updateFavoriteCount } from "../../../helpers/helpers";
import { addFavorite, removeFavorite } from "../favorites/favoritesSlice";

const initialState = {
  blogs: [],
  selectedBlog: null,
  loading: false,
  error: null,
};

const blogAPI = API.blogs;

export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(blogAPI);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch blogs"
      );
    }
  }
);

export const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setSelectedBlog: (state, action) => {
      state.selectedBlog = action.payload;
      state.error = null;
    },
    clearSelectedBlog: (state) => {
      state.selectedBlog = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch blogs";
      })
      //update favorite_count
      .addCase(addFavorite.fulfilled, (state, action) => {
        const { favorite_type: type, item_id: itemId } = action.payload;
        if (type === "blog") updateFavoriteCount(state.blogs, itemId, true);
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        const { type, itemId } = action.payload;
        if (type === "blog") updateFavoriteCount(state.blogs, itemId, false);
      });
  },
});

export const { setSelectedBlog, clearSelectedBlog } = blogsSlice.actions;
export default blogsSlice.reducer;
