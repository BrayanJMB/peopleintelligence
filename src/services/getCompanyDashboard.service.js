import axios from '../utils/axiosInstance';

export const getCompanyDashboardsAPI = async (id) => {

  const response = await axios.get('PowerBy/CompanyDashboards/' + id);
  return response;
};
