import axios from '../utils/axiosInstance';

/**
 * Fetch Contract Type.
 *
 * @returns {Promise<any>}
 */
export const fetchHiringTypeAPI = async () => axios.get('HiringType/');

/**
 * Update Contract Type.
 *
 * @param id
 * @param data
 * @returns {Promise<any>}
 */
export const updateHiringTypeAPI = async ({...data}) => axios.put('HiringType/', data);

/**
 * Delete Contract Type.
 *
 * @param id
 * @returns {Promise<any>}
 */
export const deleteHiringTypeAPI = async (id) => axios.delete(`HiringType/${id}`);

/**
 * Store Contract Type.
 *
 * @param data
 * @returns {Promise<any>}
 */
export const storeHiringTypeAPI = async (data) => axios.post('HiringType/', data);
