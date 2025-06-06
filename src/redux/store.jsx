import { configureStore } from '@reduxjs/toolkit';

import adminReducer from '../features/adminSlice';
import authReducer from '../features/authSlice';
import CarouselSlice from '../features/CarouselSlice';
import companiesSlice from '../features/companies/companiesSlice';
import activeCompaniesSlice from '../features/employe/employe';
import powerBiReducer from '../features/powerBiSlice';
import surveysSlice from '../features/surveys/surveysSlice';
import token360Slice from '../features/token360Slice'
export const store = configureStore({
  reducer: {
    admin: adminReducer,
    powerBi: powerBiReducer,
    auth: authReducer,
    companies: companiesSlice,
    surveys : surveysSlice,
    carousel  : CarouselSlice,
    activeCompanies : activeCompaniesSlice,
    token360: token360Slice
  },
  devTools: true,
});
