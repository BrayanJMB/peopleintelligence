import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../helpers/apiSlice";
import adminReducer from "../features/adminSlice";
import powerBiReducer from "../features/powerBiSlice";
import authReducer from "../features/authSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    powerBi: powerBiReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
