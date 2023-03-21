import axios from '../utils/axiosInstance';

export const postReportAPI = async (data) => {
  console.log('postReportAPI');

  const response = await axios.post('ListaDashboards/', { ...data });
  return response;
};
