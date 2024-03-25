import axios from '../utils/axiosInstance';

export const getReportsAPI = async () => {
  const response = await axios.get('ListaDashboards/');
  return response;
};
