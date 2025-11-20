import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../../api";

const initialState = {
  blogs: [],
  selectedBlog: null,
  loading: false,
  error: null,
};

// const blogAPI = "http://localhost:3001/blogs";
const blogAPI = API.blogs;

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const res = await axios.get(blogAPI);
  return res.data.data;
});

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
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload;
        state.loading = false;
      })
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      });
  },
});

export const { setSelectedBlog, clearSelectedBlog } = blogsSlice.actions;
export default blogsSlice.reducer;
