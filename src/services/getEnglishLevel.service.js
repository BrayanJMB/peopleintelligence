import axios from '../utils/axiosInstance';

/**
 * Fetch Contract Type.
 *
 * @returns {Promise<any>}
 */
export const fetchEnglishLevelAPI = async () => axios.get('EnglishLevel/');

/**
 * Update Contract Type.
 *
 * @param id
 * @param data
 * @returns {Promise<any>}
 */
export const updateEnglishLevelAPI = async ({...data}) => axios.put('EnglishLevel/', data);

/**
 * Delete Contract Type.
 *
 * @param id
 * @returns {Promise<any>}
 */
export const deleteEnglishLevelAPI = async (id) => axios.delete(`EnglishLevel/${id}`);

/**
 * Store Contract Type.
 *
 * @param data
 * @returns {Promise<any>}
 */
export const storeEnglishLevelAPI = async (data) => axios.post('EnglishLevel/', data);
