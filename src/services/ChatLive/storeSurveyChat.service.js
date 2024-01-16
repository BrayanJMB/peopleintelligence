import axios from 'axios';

const api = axios.create({
  baseURL: 'https://chatapppeopleintelligence.azurewebsites.net/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const storeSurveyChatAPI = async (payload) => {
  const response = await api.post('CustomCahtApi/CreateChat/', payload);
  return response;
};


export const storeSurveyQuestionImageAPI = async (payload) => {
  const response = await api.post('CustomCahtApi//api/CustomCahtApi/UploadImagesQuestion/', payload);
  return response;
};


export const storeSurveyQuestionVideoAPI = async (payload) => {
  const response = await api.post('CustomCahtApi/CreateChat/', payload);
  return response;
};