import axios from "../utils/axiosInstance";

export const getCompaniesAPI = async () => {
  console.log("getCompaniesAPI");

  const response = await axios.get("companias/");
  return response;
};
