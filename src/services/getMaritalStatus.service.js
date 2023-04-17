import axios from '../utils/axiosInstance';

/**
 * Fetch Marital Status.
 *
 * @returns {Promise<any>}
 */
export const fetchMaritalStatusAPI = async () => axios.get('MaritalStatus/');

/**
 * Fetch Marital Status by companyId.
 *
 * @returns {Promise<any>}
 */
export const fetchMaritalStatusByCompanyAPI = async (idCompany) => axios.get(`MaritalStatus/Company/${idCompany}`);


/**
 * Store Marital Status.
 *
 * @param data
 * @returns {Promise<any>}
 */
export const storeMaritalStatusAPI = async ({ idCompany, ...data }) => axios.post(`MaritalStatus/${idCompany}`, data);


/**
 * Update Marital Status.
 *
 * @param id
 * @param data
 * @returns {Promise<any>}
 */
export const updateMaritalStatusAPI = async ({...data}) => axios.put('MaritalStatus/', data);

/**
 * Delete Marital Status.
 *
 * @param id
 * @returns {Promise<any>}
 */
export const deleteMaritalStatusAPI = async (id, idCompany) => axios.delete(`MaritalStatus/${id}/${idCompany}`);

