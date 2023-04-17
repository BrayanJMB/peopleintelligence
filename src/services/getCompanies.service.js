import axios from '../utils/axiosInstance';

export const getCompaniesAPI = async (id) => axios.get('companias/MultiCompani/' + id);

export const getCompaniesByIdAPI = async (id) => axios.get('companias/' + id);

export const getAllCompaniesAPI = async () => axios.get('companias/');
