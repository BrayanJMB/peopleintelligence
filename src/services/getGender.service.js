import axios from '../utils/axiosInstance';

/**
 * Fetch Gender.
 *
 * @returns {Promise<any>}
 */
export const fetchGenderAPI = async () => axios.get('generos/');

/**
 * Fetch Gender by companyId.
 *
 * @returns {Promise<any>}
 */
export const fetchGenderByCompanyAPI = async (idCompany) => axios.get(`generos/Company/${idCompany}`);


/**
 * Store Gender.
 *
 * @param data
 * @returns {Promise<any>}
 */
export const storeGenderAPI = async ({ idCompany, ...data }) => axios.post(`generos/${idCompany}`, data);

/**
 * Update Gender.
 *
 * @param id
 * @param data
 * @returns {Promise<any>}
 */
export const updateGenderAPI = async ({...data}) => axios.put('generos/', data);

/**
 * Delete Gender.
 *
 * @param id
 * @returns {Promise<any>}
 */
export const deleteGenderAPI = async (id, idCompany) => axios.delete(`generos/${id}/${idCompany}`);


