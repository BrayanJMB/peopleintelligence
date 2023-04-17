import axios from '../utils/axiosInstance';

/**
 * Fetch Contract Type.
 *
 * @returns {Promise<any>}
 */
export const fetchDisabilitiesAPI = async () => axios.get('Disabilities/');

/**
 * Fetch Disabilities by companyId.
 *
 * @returns {Promise<any>}
 */
export const fetchDisabilitiesByCompanyAPI = async (idCompany) => axios.get(`Disabilities/Company/${idCompany}`);


/**
 * Store Contract Type.
 *
 * @param data
 * @returns {Promise<any>}
 */
export const storeDisabilitiesAPI = async ({ idCompany, ...data }) => axios.post(`Disabilities/${idCompany}`, data);



/**
 * Update Contract Type.
 *
 * @param id
 * @param data
 * @returns {Promise<any>}
 */
export const updateDisabilitiesAPI = async ({...data}) => axios.put('Disabilities/', data);

/**
 * Delete Contract Type.
 *
 * @param id
 * @returns {Promise<any>}
 */
export const deleteDisabilitiesAPI = async (id, idCompany) => axios.delete(`Disabilities/${id}/${idCompany}`);

