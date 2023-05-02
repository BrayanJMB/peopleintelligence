import axios from '../utils/axiosInstance';

export const deleteDashboardAPI = async (id) => {

  const response = await axios.delete(
    'PowerBy/DeletDashboard?idDashboard=' + id
  );
  return response;
};
