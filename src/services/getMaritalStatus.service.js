import axios from '../utils/axiosInstance';

/**
 * Fetch Contract Type.
 *
 * @returns {Promise<any>}
 */
export const fetchMaritalStatusAPI = async () => axios.get('estados-civiles/');

/**
 * Update Contract Type.
 *
 * @param id
 * @param data
 * @returns {Promise<any>}
 */
export const updateMaritalStatusAPI = async ({...data}) => axios.put('estados-civiles/', data);

/**
 * Delete Contract Type.
 *
 * @param id
 * @returns {Promise<any>}
 */
export const deleteMaritalStatusAPI = async (id) => axios.delete(`estados-civiles/${id}`);

/**
 * Store Contract Type.
 *
 * @param data
 * @returns {Promise<any>}
 */
export const storeMaritalStatusAPI = async (data) => axios.post('estados-civiles/', data);
