import axios from '../utils/axiosInstance';

export const getOnasAPI = async (id) => await axios.get(`OnasSurvey/ListaEncuestaS/${id}`);
