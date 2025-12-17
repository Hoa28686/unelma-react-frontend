import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../../api";
import axios from "axios";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const purchaseAPI = API.purchases;

// fetch all purchases for user
export const fetchPurchases = createAsyncThunk(
  "purchases/fetchPurchases",
  async (token) => {
    const res = await axios.get(purchaseAPI, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.purchases;
  }
);

const purchasesSlice = createSlice({
  name: "purchases",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPurchases.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPurchases.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchPurchases.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default purchasesSlice.reducer;
