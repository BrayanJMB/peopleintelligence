import axios from '../utils/axiosInstance';

export const getOnasDetailsAPI = async (id) => {
  const response = await axios.get('OnasSurvey/DetallesEncuesta/' + id);
  return response;
};
