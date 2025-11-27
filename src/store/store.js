import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "./slices/blogs/blogsSlice";
import productsReducer from "./slices/products/productsSlice";
import favoritesReducer from "./slices/favorites/favoritesSlice";
import servicesReducer from "../lib/features/services/servicesSlice";
import cartReducer from "../lib/features/cart/cartSlice";
import authReducer from "../lib/features/auth/authSlice";

export const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    products: productsReducer,
    services: servicesReducer,
    favorites: favoritesReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});
