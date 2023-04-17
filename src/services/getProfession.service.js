import axios from '../utils/axiosInstance';
/**
 * Fetch Profession Type.
 *
 * @returns {Promise<any>}
 */
export const fetchProfessionAPI = async () => axios.get('Profession/');

/**
 * Fetch Profession by companyId.
 *
 * @returns {Promise<any>}
 */
export const fetchProfessionByCompanyAPI = async (idCompany) => axios.get(`Profession/Company/${idCompany}`);

/**
 * Store Profession Type.
 *
 * @param data
 * @returns {Promise<any>}
 */
export const storeProfessionAPI = async ({idCompany, ...data}) => axios.post(`Profession/${idCompany}`, data);

/**
 * Update Profession Type.
 *
 * @param id
 * @param data
 * @returns {Promise<any>}
 */
export const updateProfessionAPI = async ({...data}) => axios.put('Profession/', data);

/**
 * Delete Profession Type.
 *
 * @param id
 * @returns {Promise<any>}
 */
export const deleteProfessionAPI = async (id, idCompany) => axios.delete(`Profession/${id}/${idCompany}`);

