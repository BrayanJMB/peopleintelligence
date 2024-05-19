import { configureStore } from '@reduxjs/toolkit';

import adminReducer from '../features/adminSlice';
import authReducer from '../features/authSlice';
import companiesSlice from '../features/companies/companiesSlice';
import activeCompaniesSlice from '../features/employe/employe';
import powerBiReducer from '../features/powerBiSlice';
import surveysSlice from '../features/surveys/surveysSlice';
import CarouselSlice from '../features/CarouselSlice';

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    powerBi: powerBiReducer,
    auth: authReducer,
    companies: companiesSlice,
    surveys : surveysSlice,
    carousel  : CarouselSlice,
    activeCompanies : activeCompaniesSlice,
  },
  devTools: true,
});
