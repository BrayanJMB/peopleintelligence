import axios from '../utils/axiosInstance';

/**
 * Store Rol Company.
 *
 * @returns {Promise<any>}
 */
export const storeRolCompanyAPI = async ({idCompany, ...data}) => axios.post(`/RollCompany/${idCompany}`, data);


/**
 * Fetch Rol Company.
 *
 * @returns {Promise<any>}
 */
export const fetchRolCompanyAPI = async (idCompany) => axios.get(`/RollCompany/Company/${idCompany}`);


/**
 * Delete Rol Company.
 *
 * @returns {Promise<any>}
 */
export const deleteRolCompanyAPI = async (id, idCompany) => axios.delete(`/RollCompany/${id}/${idCompany}`);

