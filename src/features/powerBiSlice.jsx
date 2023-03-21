import { createSlice } from '@reduxjs/toolkit';

const powerBiSlice = createSlice({
  name: 'powerBi',
  initialState: {
    dashboard: [],
    report: [],
    companyDashboards: [],
  },
  reducers: {
    addItem: (state, action) => {
      let type = action.payload.type;
      state[type].push(action.payload.data);
    },
    removeItemBi: (state, action) => {
      let type = action.payload.type;
      let index = state[type].findIndex((p) => p._id === action.payload.id);
      if (index > -1) {
        state[type].splice(index, 1);
      }
    },
    updateItem: (state, action) => {
      let type = action.payload.type;
      let index = state[type].findIndex((p) => p._id === action.payload.id);
      let holder = [...state[type]];
      holder[index] = action.payload.data;
      state[type] = holder;
    },
    storeItems: (state, action) => {
      let type = action.payload.type;
      state[type] = action.payload.data;
    },
    storeDash: (state, action) => {
      state.companyDashboards = action.payload;
    },
  },
});

export const { addItem, removeItemBi, updateItem, storeItems, storeDash } =
  powerBiSlice.actions;
export default powerBiSlice.reducer;
