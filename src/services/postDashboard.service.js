import axios from '../utils/axiosInstance';

export const postDashboardAPI = async (data) => {
  console.log('postDashboardAPI');

  const response = await axios.post('PowerBy/CreateDashboard/', { ...data });
  return response;
};
