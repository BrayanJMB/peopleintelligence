import axios from '../utils/axiosInstance';
/**
 * Fetch Profession Type.
 *
 * @returns {Promise<any>}
 */
export const fetchPersonAPI = async () => axios.get('personas/');

