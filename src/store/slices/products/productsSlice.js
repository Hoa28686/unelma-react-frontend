import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../../api";

const initialState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
};

// const productAPI = "http://localhost:3001/products";
// const productAPI = "http://127.0.0.1:8000/api/products";
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
      });
  },
});

export const { setSelectedProduct, clearSelectedProduct } =
  productsSlice.actions;
export default productsSlice.reducer;
