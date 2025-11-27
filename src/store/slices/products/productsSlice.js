import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../../api";
import { updateFavoriteCount } from "../../../helpers/helpers";
import { addFavorite, removeFavorite } from "../favorites/favoritesSlice";

const initialState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
};

const productAPI = API.products;

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await axios.get(productAPI);
    return res.data.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
      state.error = null;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        const { favorite_type: type, item_id: itemId } = action.payload;
        if (type === "product")
          updateFavoriteCount(state.products, itemId, true);
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        const { type, itemId } = action.payload;
        if (type === "product")
          updateFavoriteCount(state.products, itemId, false);
      });
  },
});

export const { setSelectedProduct, clearSelectedProduct } =
  productsSlice.actions;
export default productsSlice.reducer;
