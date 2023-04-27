import axios from '../utils/axiosInstance';

export const getCompaniesAPI = async (idUser) => axios.get(`companias/MultiCompani/${idUser}`);

export const getCompaniesByIdAPI = async (id) => axios.get('companias/' + id);

export const getAllCompaniesAPI = async () => axios.get('companias/');

export const storeCompanyAPI = async ({idUser, ...data}) => axios.post(`companias/${idUser}`, data);

export const deleteCompanyAPI = async (id) => axios.delete(`companias/${id}`);

export const updateStateCompanyAPI = async (idCompany, state) => axios.patch(`companias/StateCompani/${idCompany}/${state}`)