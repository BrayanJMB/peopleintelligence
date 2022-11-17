import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../features/adminSlice";
import powerBiReducer from "../features/powerBiSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    powerBi: powerBiReducer,
  },
});
