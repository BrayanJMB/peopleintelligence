import axios from '../../../../../utils/axiosInstance'

/**
 * Statics Mail.
 * 
 * @returns {Promise<any>}
 */
export const fetchStaticsMailAPI = async (idSurvey) => axios.get(`Mail/statics/${idSurvey}`);
