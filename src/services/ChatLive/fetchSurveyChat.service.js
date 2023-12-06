import axios from 'axios';

const api = axios.create({
  baseURL: 'https://chatapppeopleintelligence.azurewebsites.net/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fecthSurveyChatAPI = async (idCompany) => {
  const response = await api.get(`CustomCahtApi/GetSurvey/${idCompany}`);
  return response;
};

export const fecthModeradorAPI = async (idSurvey) => {
  const response = await api.get(`CustomCahtApi/GetModerator/${idSurvey}`);
  return response;
};
