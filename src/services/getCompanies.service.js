import axios from "../utils/axiosInstance";

export const getCompaniesAPI = async (id) => {
  console.log("getCompaniesAPI");

  const response = await axios.get("companias/GetCompanias/" + id);
  return response;
};
