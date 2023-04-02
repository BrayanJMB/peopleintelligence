import axios from '../utils/axiosInstance';
/**
 * Fetch EducationLevel Type.
 *
 * @returns {Promise<any>}
 */
export const fetchEducationLevelAPI = async () => axios.get('EducationLevel/');

/**
 * Update EducationLevel Type.
 *
 * @param id
 * @param data
 * @returns {Promise<any>}
 */
export const updateEducationLevelAPI = async ({...data}) => axios.put('EducationLevel/', data);

/**
 * Delete EducationLevel Type.
 *
 * @param id
 * @returns {Promise<any>}
 */
export const deleteEducationLevelAPI = async (id) => axios.delete(`EducationLevel/${id}`);

/**
 * Store EducationLevel Type.
 *
 * @param data
 * @returns {Promise<any>}
 */
export const storeEducationLevelAPI = async (data) => axios.post('EducationLevel/', data);
