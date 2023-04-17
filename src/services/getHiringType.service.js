import axios from '../utils/axiosInstance';

/**
 * Fetch Hiring Type.
 *
 * @returns {Promise<any>}
 */
export const fetchHiringTypeAPI = async () => axios.get('HiringType/');

/**
 * Fetch Hiring Type by companyId.
 *
 * @returns {Promise<any>}
 */
export const fetchHiringTypeByCompanyAPI = async (idCompany) => axios.get(`HiringType/Company/${idCompany}`);


/**
 * Store Hiring Type.
 *
 * @param data
 * @returns {Promise<any>}
 */
export const storeHiringTypeAPI = async ({ idCompany, ...data }) => axios.post(`HiringType/${idCompany}`, data);

/**
 * Update Hiring Type.
 *
 * @param id
 * @param data
 * @returns {Promise<any>}
 */
export const updateHiringTypeAPI = async ({...data}) => axios.put('HiringType/', data);

/**
 * Delete Hiring Type.
 *
 * @param id
 * @returns {Promise<any>}
 */
export const deleteHiringTypeAPI = async (id, idCompany) => axios.delete(`HiringType/${id}/${idCompany}`);

