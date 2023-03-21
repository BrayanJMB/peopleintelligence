import axios from '../utils/axiosInstance';

export const getOfficesAPI = async () => {
  console.log('getOfficesAPI');

  const response = await axios.get('Campus/');
  return response;
};
