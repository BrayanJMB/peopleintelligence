import axios from '../utils/axiosInstance';

/**
 * Fetch Journey Map.
 *
 * @returns {Promise<any>}
 */
export const fetchJourneyMapAPI = async (idCompany) => axios.get(`GetJorneyMapCompany/${idCompany}`);

/**
 * Update Journey Map.
 *
 * @param id
 * @param data
 * @returns {Promise<any>}
 */
export const updateJourneyMapAPI = async ({id, ...data}) => axios.put(`GetJorneyMap/${id}`, data);

/**
 * Delete Journey Map.
 *
 * @param id
 * @returns {Promise<any>}
 */
export const deleteJourneyMapAPI = async (id) => axios.delete(`GetJorneyMap/${id}`);

/**
 * Store Journey Map.
 *
 * @param data
 * @returns {Promise<any>}
 */
export const storeJourneyMapAPI = async (data) => axios.post('GetJorneyMap/', data);

/**
 * Get Journeys by company and map.
 *
 * @param companyId
 * @param mapId
 * @returns {Promise<any>}
 */
export const getJourneysCompanyAPI = async (companyId, mapId) => axios.get(`GetJorneysCompany/${companyId}/${mapId}`);