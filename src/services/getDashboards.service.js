import axios from '../utils/axiosInstance';

export const getDashboardsAPI = async () => {
  const response = await axios.get('PowerBy/AllDashboards/');
  return response;
};
