import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import client from '../../utils/axiosInstance';

const initialState = {
  currentSurvey: null,
  status: 'idle',
  error: null,
};

export const fetchSurveyByIdAndCompanyId = createAsyncThunk(
  'surveys/fetchByIdAndCompanyId',
  async ({ surveyId, companyId }) => {
    const { data } = await client.get(`ShowQuestion/${surveyId}/${companyId}`)

    return data;
  }
)

const surveysSlice = createSlice({
  name: 'surveys',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSurveyByIdAndCompanyId.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchSurveyByIdAndCompanyId.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.currentSurvey = action.payload;
    },
    [fetchSurveyByIdAndCompanyId.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  }
});

export const selectCurrentSurvey = (state) => state.surveys.currentSurvey;
export const selectSurveysStatus = (state) => state.surveys.status;

export default surveysSlice.reducer;