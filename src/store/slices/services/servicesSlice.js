import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../../api";
import { addFavorite, removeFavorite } from "../favorites/favoritesSlice";
import { updateFavoriteCount } from "../../../helpers/helpers";

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
    return res.data.data;
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
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        const { favorite_type: type, item_id: itemId } = action.payload;
        if (type === "service")
          updateFavoriteCount(state.services, itemId, true);
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        const { type, itemId } = action.payload;
        if (type === "service")
          updateFavoriteCount(state.services, itemId, false);
      });
  },
});

export const { setSelectedService, clearSelectedService } =
  servicesSlice.actions;
export default servicesSlice.reducer;
