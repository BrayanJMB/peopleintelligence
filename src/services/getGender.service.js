import axios from '../utils/axiosInstance';

/**
 * Fetch Contract Type.
 *
 * @returns {Promise<any>}
 */
export const fetchGenderAPI = async () => axios.get('Gender/');

/**
 * Update Contract Type.
 *
 * @param id
 * @param data
 * @returns {Promise<any>}
 */
export const updateGenderAPI = async ({...data}) => axios.put('Gender/', data);

/**
 * Delete Contract Type.
 *
 * @param id
 * @returns {Promise<any>}
 */
export const deleteGenderAPI = async (id) => axios.delete(`Gender/${id}`);

/**
 * Store Contract Type.
 *
 * @param data
 * @returns {Promise<any>}
 */
export const storeGenderAPI = async (data) => axios.post('Gender/', data);
