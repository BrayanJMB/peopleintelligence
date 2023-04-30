import client from '../utils/axiosInstance';

/**
 * Fetch question types from API.
 * 
 * @returns {Promise<any>} The question types.
 */
export const fetchQuestionTypesAPI = async () => client.get('TipoPregunta');