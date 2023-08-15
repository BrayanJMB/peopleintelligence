import axios from 'axios';

const api = axios.create({
  baseURL: 'https://chatapppeopleintelligence.azurewebsites.net/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const deleteSurveyChatAPI = async (surveyId) => {
  const response = await api.delete(`CustomCahtApi/DeleteSurvey/${surveyId}`);
  return response;
};
