import axios from "../utils/axiosInstance";

export const getCompanyDashboardsAPI = async (id) => {
  console.log("getCompanyDashboardsAPI");

  const response = await axios.get("PowerBy/CompanyDashboards/" + id);
  return response;
};
