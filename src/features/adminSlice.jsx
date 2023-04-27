import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    Empresas: [],
    Empleados: [],
    Departamentos: [],
    //Oficinas: [],
  },
  reducers: {
    addItem: (state, action) => {
      let type = action.payload.type;
      state[type].push(action.payload.data);
    },
    removeItem: (state, action) => {
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
  },
});

export const { addItem, removeItem, updateItem, storeItems } =
  adminSlice.actions;
export default adminSlice.reducer;
