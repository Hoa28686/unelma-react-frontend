import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../../api";

const initialState = {
  favorites: [],
  loading: false,
  error: null,
};

const favoriteAPI = API.favorites;

// fetch all favorites for logged-in user
export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async ({ token }) => {
    const res = await axios.get(favoriteAPI, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data;
  }
);

// add favorite
export const addFavorite = createAsyncThunk(
  "favorites/addFavorite",
  async ({ type, itemId, token }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        favoriteAPI,
        { favorite_type: type, item_id: itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const removeFavorite = createAsyncThunk(
  "favorites/removeFavorite",
  async ({ type, itemId, token }, { rejectWithValue }) => {
    try {
      await axios.delete(favoriteAPI, {
        headers: { Authorization: `Bearer ${token}` },
        data: { favorite_type: type, item_id: itemId },
      });
      return { type, itemId };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetch
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.loading = false;
      })
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // add
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.favorites.push(action.payload);
        state.loading = false;
      })

      //remove
      .addCase(removeFavorite.fulfilled, (state, action) => {
        const { type, itemId } = action.payload;

        state.favorites = state.favorites.filter(
          (fav) => !(fav.favorite_type === type && fav.item_id === itemId)
        );

        state.loading = false;
      });
  },
});

export default favoriteSlice.reducer;
