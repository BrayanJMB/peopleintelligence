import axios from '../utils/axiosInstance';

export const postReportAPI = async (data) => {
  const response = await axios.post('ListaDashboards/', { ...data });
  return response;
};
