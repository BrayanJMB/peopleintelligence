import axios from '../utils/axiosInstance';
/**
 * Fetch Profession Type.
 *
 * @returns {Promise<any>}
 */
export const fetchProfessionAPI = async () => axios.get('Profesion/');

/**
 * Update Profession Type.
 *
 * @param id
 * @param data
 * @returns {Promise<any>}
 */
export const updateProfessionAPI = async ({...data}) => axios.put('Profesion/', data);

/**
 * Delete Profession Type.
 *
 * @param id
 * @returns {Promise<any>}
 */
export const deleteProfessionAPI = async (id) => axios.delete(`Profesion/${id}`);

/**
 * Store Profession Type.
 *
 * @param data
 * @returns {Promise<any>}
 */
export const storeProfessionAPI = async (data) => axios.post('Profesion/', data);