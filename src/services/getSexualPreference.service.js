import axios from '../utils/axiosInstance';

/**
 * Fetch Contract Type.
 *
 * @returns {Promise<any>}
 */
export const fetchSexualPreferenceAPI = async () => axios.get('PreferenciaSexual/');

/**
 * Update Contract Type.
 *
 * @param id
 * @param data
 * @returns {Promise<any>}
 */
export const updateSexualPreferenceAPI = async ({...data}) => axios.put('PreferenciaSexual/', data);

/**
 * Delete Contract Type.
 *
 * @param id
 * @returns {Promise<any>}
 */
export const deleteSexualPreferenceAPI = async (id) => axios.delete(`PreferenciaSexual/${id}`);

/**
 * Store Contract Type.
 *
 * @param data
 * @returns {Promise<any>}
 */
export const storeSexualPreferenceAPI = async (data) => axios.post('PreferenciaSexual/', data);
