import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const saveSearch = createAsyncThunk(
  'places/saveSearch',
  async (placeData, { dispatch }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(placeData);
      }, 300);
    });
  }
);

export const markAsFavorite = createAsyncThunk(
  'places/markAsFavorite',
  async (placeId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(placeId);
      }, 300);
    });
  }
);

const initialState = {
  recentSearches: [],
  selectedPlace: null,
  status: 'idle',
};

export const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    setSelectedPlace: (state, action) => {
      state.selectedPlace = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveSearch.fulfilled, (state, action) => {
        const exists = state.recentSearches.find(p => p.placeId === action.payload.placeId);
        if (!exists) {
          state.recentSearches.unshift({ ...action.payload, isFavorite: false });
        }
        state.selectedPlace = action.payload;
      })
      .addCase(markAsFavorite.fulfilled, (state, action) => {
        const placeId = action.payload;
        const place = state.recentSearches.find(p => p.placeId === placeId);
        if (place) {
          place.isFavorite = !place.isFavorite;
        }
        if (state.selectedPlace && state.selectedPlace.placeId === placeId) {
          state.selectedPlace.isFavorite = !state.selectedPlace.isFavorite;
        }
      });
  },
});

export const { setSelectedPlace } = placesSlice.actions;

export default placesSlice.reducer;
