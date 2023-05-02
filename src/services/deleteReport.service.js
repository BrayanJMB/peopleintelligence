import axios from '../utils/axiosInstance';

export const deleteReportAPI = async (id) => {

  const response = await axios.delete('ListaDashboards/' + id);
  return response;
};
