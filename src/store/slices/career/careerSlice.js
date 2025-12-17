import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../../api";

const initialState = {
  jobs: [],
  selectedJob: null,
  loading: false,
  error: null,
};

const careerApi = API.careers;

export const fetchCareers = createAsyncThunk(
  "careers/fetchCareers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(careerApi);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch careers"
      );
    }
  }
);

export const CareerSlice = createSlice({
  name: "careers",
  initialState,
  reducers: {
    setSelectedCareer: (state, action) => {
      state.selectedJob = action.payload;
      state.error = null;
    },
    clearSelectedCareer: (state) => {
      state.selectedJob = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCareers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCareers.fulfilled, (state, action) => {
        state.jobs = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCareers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch jobs";
      });
  },
});

export const { setSelectedCareer, clearSelectedCareer } = CareerSlice.actions;
export default CareerSlice.reducer;
