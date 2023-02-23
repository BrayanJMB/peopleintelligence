import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import client from '../../utils/axiosInstance';

const initialState = {
  currentSurvey: null,
  currentSurveyForAnswer: null,
  status: 'idle',
  error: null,
};

export const fetchSurveyByIdAndCompanyId = createAsyncThunk(
  'surveys/fetchByIdAndCompanyId',
  async ({ surveyId, companyId }) => {
    const { data } = await client.get(`ShowQuestion/${surveyId}/${companyId}`)

    return data;
  }
);

export const fetchSurveyForAnswer = createAsyncThunk(
  'surveys/fetchSurveyForAnswer',
  async ({ surveyId, companyId }) => {
    const { data } = await client.get(`ShowQuestionAnswer/${surveyId}/${companyId}`)

    return data;
  }
);

const surveysSlice = createSlice({
  name: 'surveys',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSurveyByIdAndCompanyId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSurveyByIdAndCompanyId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentSurvey = action.payload;
      } )
      .addCase(fetchSurveyByIdAndCompanyId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      }
    );

    builder
      .addCase(fetchSurveyForAnswer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSurveyForAnswer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentSurveyForAnswer = action.payload;
      })
      .addCase(fetchSurveyForAnswer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});


export const selectCurrentSurvey = (state) => state.surveys.currentSurvey;
export const selectCurrentSurveyForAnswer = (state) => state.surveys.currentSurveyForAnswer;
export const selectSurveysStatus = (state) => state.surveys.status;

export default surveysSlice.reducer;