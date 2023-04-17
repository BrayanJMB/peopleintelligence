import axios from '../utils/axiosInstance';

/**
 * Fetch Sexual Preference.
 *
 * @returns {Promise<any>}
 */
export const fetchSexualPreferenceAPI = async () => axios.get('SexualPreference/');

/**
 * Fetch Sexual Preference by companyId.
 *
 * @returns {Promise<any>}
 */
export const fetchSexualPreferenceByCompanyAPI = async (idCompany) => axios.get(`SexualPreference/Company/${idCompany}`);


/**
 * Store Contract Type.
 *
 * @param data
 * @returns {Promise<any>}
 */
export const storeSexualPreferenceAPI = async ({idCompany, ...data}) => axios.post(`SexualPreference/${idCompany}`, data);


/**
 * Update Sexual Preference.
 *
 * @param id
 * @param data
 * @returns {Promise<any>}
 */
export const updateSexualPreferenceAPI = async ({...data}) => axios.put('SexualPreference/', data);

/**
 * Delete Sexual Preference.
 *
 * @param id
 * @returns {Promise<any>}
 */
export const deleteSexualPreferenceAPI = async (id, idCompany) => axios.delete(`SexualPreference/${id}/${idCompany}`);


