import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to save a place search
export const saveSearch = createAsyncThunk(
  'places/saveSearch',
  async (placeData, { dispatch }) => {
    // We can just simulate an async operation with Thunk here
    // In the future this would trigger the webservice call to java spring boot API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(placeData);
      }, 300);
    });
  }
);

// Async thunk to mark as favorite
export const markAsFavorite = createAsyncThunk(
  'places/markAsFavorite',
  async (placeId) => {
    // This will be implemented fully later with java spring boot API
    // For now we just return the placeId to update the redux state
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
        // Add to recent searches if not already there
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
          place.isFavorite = !place.isFavorite; // toggle favorite
        }
        if (state.selectedPlace && state.selectedPlace.placeId === placeId) {
          state.selectedPlace.isFavorite = !state.selectedPlace.isFavorite;
        }
      });
  },
});

export const { setSelectedPlace } = placesSlice.actions;

export default placesSlice.reducer;
