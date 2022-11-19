import axios from "axios";

const API = "https://peopleintelligenceapi.azurewebsites.net/api/";
const config = {
  headers: { "Content-type": "application/json" },
};

export const getCompaniesAPI = async () => {
  console.log("getCompaniesAPI");
  const response = await axios
    .create({
      baseURL: API,
    })
    .get("companias/", config);
  return response;
};
