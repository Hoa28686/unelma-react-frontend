import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "./features/blogs/blogsSlice";
import productsReducer from "./features/products/productsSlice";

export const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    products: productsReducer,
  },
});
