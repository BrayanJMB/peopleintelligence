import axios from '../utils/axiosInstance';

/**
 * Fetch Contract Type.
 *
 * @returns {Promise<any>}
 */
export const fetchDisabilitiesAPI = async () => axios.get('Disabilities/');

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
export const deleteDisabilitiesAPI = async (id) => axios.delete(`Disabilities/${id}`);

/**
 * Store Contract Type.
 *
 * @param data
 * @returns {Promise<any>}
 */
export const storeDisabilitiesAPI = async (data) => axios.post('Disabilities/', data);
