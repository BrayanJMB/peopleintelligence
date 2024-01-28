import axios from '../utils/axiosInstance';

export const postDashboardAPI = async (data) => {
  const response = await axios.post('PowerBy/CreateDashboard/', { ...data });
  return response;
};
