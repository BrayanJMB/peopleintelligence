import axios from '../utils/axiosInstance';

/**
 * Fetch EnglishLevel.
 *
 * @returns {Promise<any>}
 */
export const storeRolCompanyAPI = async ({ idCompany, rol }) => axios.post(`/RolesCompany/${idCompany}`, { rol });


/**
 * Fetch EnglishLevel.
 *
 * @returns {Promise<any>}
 */
export const fetchRolCompanyAPI = async (idCompany) => axios.get(`/RolesCompany/Company/${idCompany}`);


/**
 * Fetch EnglishLevel.
 *
 * @returns {Promise<any>}
 */
export const deleteRolCompanyAPI = async (id, idCompany) => axios.get(`/RolesCompany/${id}/${idCompany}`);

