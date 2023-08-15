import axios from "axios";

const api = axios.create({
  baseURL: "https://chatapppeopleintelligence.azurewebsites.net/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const updateSurveyChatAPI = async (payload) => {
  const response = await api.put("CustomCahtApi/UpdateSurvey/", payload);
  return response;
};