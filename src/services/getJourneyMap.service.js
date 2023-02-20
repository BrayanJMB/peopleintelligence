import axios from "../utils/axiosInstance";

export const getJourneyMapAPI = async () => axios.get("GetJorneyMap/");

/**
 * Get Journeys by company and map.
 *
 * @param companyId
 * @param mapId
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getJourneysCompanyAPI = async (companyId, mapId) => axios.get(`GetJorneysCompany/${companyId}/${mapId}`);