import axios from "../utils/axiosInstance";

export const getReportsAPI = async () => {
  console.log("getReportsAPI");

  const response = await axios.get("ListaDashboards/");
  return response;
};
