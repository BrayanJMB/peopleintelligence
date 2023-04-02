import axios from '../utils/axiosInstance';
/**
 * Fetch Profession Type.
 *
 * @returns {Promise<any>}
 */
export const fetchProfessionAPI = async () => axios.get('Profession/');

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
export const deleteProfessionAPI = async (id) => axios.delete(`Profession/${id}`);

/**
 * Store Profession Type.
 *
 * @param data
 * @returns {Promise<any>}
 */
export const storeProfessionAPI = async (data) => axios.post('Profession/', data);