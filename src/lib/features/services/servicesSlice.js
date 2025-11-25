import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../../api";

const initialState = {
  services: [],
  selectedService: null,
  loading: false,
  error: null,
};

const servicesAPI = API.services;

export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async () => {
    const res = await axios.get(servicesAPI);
    return res.data;
  }
);

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setSelectedService: (state, action) => {
      state.selectedService = action.payload;
      state.error = null;
    },
    clearSelectedService: (state) => {
      state.selectedService = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.services = action.payload;
        state.loading = false;
      })
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedService, clearSelectedService } =
  servicesSlice.actions;
export default servicesSlice.reducer;
