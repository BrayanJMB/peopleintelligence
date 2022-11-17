import axios from "axios";

const API = "https://peopleintelligenceapi.azurewebsites.net/api/";
const config = {
  headers: { "Content-type": "application/json" },
};

export const getOfficesAPI = async () => {
  console.log("getOfficesAPI");
  const response = await axios
    .create({
      baseURL: API,
    })
    .get("Campus/", config);
  return response;
};
