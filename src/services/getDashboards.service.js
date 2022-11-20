import axios from "../utils/axiosInstance";

export const getDashboardsAPI = async () => {
  console.log("getDashboardsAPI");

  const response = await axios.get("PowerBy/AllDashboards/");
  return response;
};
