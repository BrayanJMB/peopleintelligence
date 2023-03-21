import axios from '../utils/axiosInstance';

export const getCompaniesAPI = async (id) => axios.get('companias/MultiCompani/' + id);
