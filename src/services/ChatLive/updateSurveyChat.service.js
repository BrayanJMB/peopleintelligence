import axios from 'axios';

const api = axios.create({
  baseURL: 'https://chatapppeopleintelligence.azurewebsites.net/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const updateSurveyChatAPI = async (payload) => {
  const response = await api.put('CustomCahtApi/UpdateSurvey/', payload);
  return response;
};

export const updateModeratorChatAPI = async (payload) => {
  const response = await api.patch('CustomCahtApi/UpdateModerator/', payload);
  return response;
};