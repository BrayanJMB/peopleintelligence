import axios from '../utils/axiosInstance';

/**
 * Fetch templates from API.
 * 
 * @returns {Promise<any>}
 */
export const fetchTemplatesAPI = async () => axios.get('GetTemplates/');

/**
 * Delete template from API.
 * 
 * @param {number} id The template id.
 * @returns 
 */
export const deleteTemplateAPI = async (id) => axios.delete(`deleteTemplate/${id}`);
