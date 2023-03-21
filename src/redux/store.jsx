import { configureStore } from '@reduxjs/toolkit';

import adminReducer from '../features/adminSlice';
import authReducer from '../features/authSlice';
import companiesSlice from '../features/companies/companiesSlice';
import powerBiReducer from '../features/powerBiSlice';
import surveysSlice from '../features/surveys/surveysSlice';

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    powerBi: powerBiReducer,
    auth: authReducer,
    companies: companiesSlice,
    surveys : surveysSlice,
  },
  devTools: true,
});
