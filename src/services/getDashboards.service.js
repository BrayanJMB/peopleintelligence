import axios from "axios";

const API = "https://peopleintelligenceapi.azurewebsites.net/api/";
const config = {
  headers: { "Content-type": "application/json" },
};

export const getDashboardsAPI = async () => {
  console.log("getDashboardsAPI");
  const response = await axios
    .create({
      baseURL: API,
    })
    .get("PowerBy/AllDashboards/", config);
  return response;
};
