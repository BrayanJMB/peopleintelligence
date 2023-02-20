import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../features/adminSlice";
import powerBiReducer from "../features/powerBiSlice";
import authReducer from "../features/authSlice";
import companiesSlice from '../features/companies/companiesSlice';

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    powerBi: powerBiReducer,
    auth: authReducer,
    companies: companiesSlice,
  },
  devTools: true,
});
