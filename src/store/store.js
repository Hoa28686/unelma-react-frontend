import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "./slices/blogs/blogsSlice";
import productsReducer from "./slices/products/productsSlice";

export const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    products: productsReducer,
  },
});
