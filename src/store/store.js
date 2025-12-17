import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "./slices/blogs/blogsSlice";
import productsReducer from "./slices/products/productsSlice";
import reviewsReducer from "./slices/products/reviewsSlice";
import purchasesReducer from "./slices/products/purchasesSlice";
import favoritesReducer from "./slices/favorites/favoritesSlice";
import servicesReducer from "./slices/services/servicesSlice";
import cartReducer from "./slices/cart/cartSlice";
import careerReducer from "./slices/career/careerSlice";

export const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    products: productsReducer,
    services: servicesReducer,
    favorites: favoritesReducer,
    purchases: purchasesReducer,
    cart: cartReducer,
    reviews: reviewsReducer,
    careers: careerReducer,
  },
});
