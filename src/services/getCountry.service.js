import axios from '../utils/axiosInstance';

export const getAllCountryAPI = async () => axios.get('paises/');

export const getCountryByIdAPI = async (id) => axios.get('paises/'+ id);