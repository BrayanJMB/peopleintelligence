import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  companies: [],
  currentCompany: null,
};

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    companiesAdded(state, action) {
      state.companies = [
        ...new Set([
          ...state.companies,
          ...action.payload])
      ];

      if (state.companies.length > 0 && !state.currentCompany) {
        state.currentCompany = state.companies[0];
      }
    },
    currentCompanySelected(state, action) {
      // search company by id
      const company = state.companies
        .find((company) => company.id === action.payload);

      if (company) {
        state.currentCompany = {
          ...company,
        };
      } else {
        state.currentCompany = null;
      }
    },
  },
})

export const { companiesAdded, currentCompanySelected } = companiesSlice.actions

export const selectAllCompanies = (state) => state.companies.companies

export const selectCompanyById = (state, companyId) => state.companies.companies.find((company) => company.id === companyId)

export default companiesSlice.reducer