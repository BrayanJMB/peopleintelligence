import axios from '../utils/axiosInstance';

export const getOnasAPI = async (id) => {
  console.log('getOnasAPI');

  const response = await axios.get('OnasSurvey/ListaEncuestaS/' + id);
  return response;
};
