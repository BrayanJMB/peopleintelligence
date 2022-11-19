import axios from "axios";

const API = "https://peopleintelligenceapi.azurewebsites.net/api/";
const config = {
  headers: { "Content-type": "application/json" },
};

export const getReportsAPI = async () => {
  console.log("getReportsAPI");
  const response = await axios
    .create({
      baseURL: API,
    })
    .get("ListaDashboards/", config);
  return response;
};
