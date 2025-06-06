import { createSlice } from '@reduxjs/toolkit';

const token360Slice = createSlice({
  name: 'token360',
  initialState: {
    value: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.value = action.payload;
    },
    clearToken: (state) => {
      state.value = null;
    },
  },
});

export const { setToken, clearToken } = token360Slice.actions;
export default token360Slice.reducer;
