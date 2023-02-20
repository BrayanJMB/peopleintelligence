import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  companies: [],
};

const companiesSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    companiesAdded(state, action) {
      state.companies = action.payload;
    },
  },
})

export const { companiesAdded} = companiesSlice.actions

export const selectAllCompanies = (state) => state.companies.companies

export const selectCompanyById = (state, companyId) => state.companies.companies.find((company) => company.id === companyId)

export default companiesSlice.reducer