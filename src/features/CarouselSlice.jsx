import { createSlice } from '@reduxjs/toolkit';

const carouselSlice = createSlice({
  name: 'carousel',
  initialState: {
    currentSlide: 1,
  },
  reducers: {
    setCurrentSlide: (state, action) => {
      state.currentSlide = action.payload;
    },
  },
});

export const { setCurrentSlide } = carouselSlice.actions;

export default carouselSlice.reducer;
