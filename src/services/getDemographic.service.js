import axios from '../utils/axiosInstance';

/**
 * Fetch Contract Type.
 *
 * @returns {Promise<any>}
 */
export const fetchDemographicsAPI = async (idCompany, idSurvey) => axios.get(`ShowDemographicSurvey/${idCompany}/${idSurvey}`);