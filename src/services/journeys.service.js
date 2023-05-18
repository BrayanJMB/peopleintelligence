import client from '../utils/axiosInstance';

/**
 * Fetch journey maps from API.
 * 
 * @returns {Promise<any>}
 */
export const fetchJourneyMapsAPI = async () => client.get('GetJorneysMap');


/**
 * Fetch journey maps from API.
 * 
 * @returns {Promise<any>}
 */
export const fetchJourneyMapsCompanyAPI = async (idCompany) => client.get(`GetJorneysMapByCompany/${idCompany}`);

/**
 * Delete journey map from API.
 * 
 * @param {number} id The journey map id.
 * @returns {Promise<any>}
 */
export const deleteJourneyMapAPI = async (id) => client.delete(`deleteJourneyMap/${id}`);