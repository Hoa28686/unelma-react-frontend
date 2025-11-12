import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "./slices/blogs/blogsSlice";
import productsReducer from "./slices/products/productsSlice";
import servicesReducer from "../lib/features/services/servicesSlice";
import cartReducer from "../lib/features/cart/cartSlice";
import authReducer from "../lib/features/auth/authSlice";

export const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    products: productsReducer,
    services: servicesReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});
