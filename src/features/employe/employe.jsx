import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import client from '../../utils/axiosInstance';

const initialState = {
  activeCompanies: [],
  drop: null,
  companiesMultiUser:[],
  status: 'idle',
  error: null,
};


export const fetchActiveCompany = createAsyncThunk(
  'companies/fetchActiveCompany',
  async ({ idUser }) => {
    const { data } = await client.get(`companias/GetCompanias/${idUser}`);
    return data;
  }
);


export const fetchCompanyMultiUser = createAsyncThunk(
  'company/fetchCompanyMultiUser',
  async ({ idUser }) => {
    const { data } = await client.get(`companias/MultiCompani/${idUser}`);
    return data;
  }
);


const activeCompaniesSlice = createSlice({
  name: 'activeCompanies',
  initialState,
  reducers: {
    setDrop: (state, action) => {
      state.drop = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActiveCompany.pending, (state) => {
        state.status = 'loading';
      })
        .addCase(fetchActiveCompany.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.activeCompanies = action.payload;

      })
      .addCase(fetchActiveCompany.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      }
    );

    builder
    .addCase(fetchCompanyMultiUser.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchCompanyMultiUser.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.companiesMultiUser = action.payload;
    })
    .addCase(fetchCompanyMultiUser.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    }
  );
  },
});

export const { setDrop } = activeCompaniesSlice.actions;
export const selectActiveCompanies = (state) => state.activeCompanies.activeCompanies;
export const selectCompaniesMultiUser = (state) => state.activeCompanies.companiesMultiUser;
/*
export const selectCurrentSurveyForAnswer = (state) => state.surveys.currentSurveyForAnswer;
export const selectSurveysStatus = (state) => state.surveys.status;
*/
export default activeCompaniesSlice.reducer;