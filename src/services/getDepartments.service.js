import axios from "axios";

const API = "https://peopleintelligenceapi.azurewebsites.net/api/";
const config = {
  headers: { "Content-type": "application/json" },
};

export const getDepartmentsAPI = async () => {
  console.log("getDepartmentsAPI");
  const response = await axios
    .create({
      baseURL: API,
    })
    .get("departamentos/", config);
  return response;
};
