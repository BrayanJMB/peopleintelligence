import axios from '../utils/axiosInstance';

export const deleteDashboardAPI = async (id) => {
  console.log('deleteDashboardAPI');

  const response = await axios.delete(
    'PowerBy/DeletDashboard?idDashboard=' + id
  );
  return response;
};
