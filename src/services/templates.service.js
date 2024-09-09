import axios from '../utils/axiosInstance';

/**
 * Fetch templates from API.
 * 
 * @returns {Promise<any>}
 */
export const fetchTemplatesAPI = async () => axios.get('GetTemplates/');

/**
 * Fetch templates by company from API.
 * 
 * @returns {Promise<any>}
 */
export const fetchTemplatesByCompanyAPI = async (companyId) => axios.get(`GetTemplates/${companyId}`);

/**
 * Delete template from API.
 * 
 * @param {number} id The template id.
 * @returns 
 */
export const deleteTemplateAPI = async (id) => axios.delete(`deleteTemplate/${id}`);

/**
 * Fetch template from API.
 * 
 * @param {number} id The template id.
 * @returns 
 */
export const showTemplateAPI = async (id) => axios.get(`GetQuestionTemplates/${id}`);

/**
 * Update template from API.
 * 
 * @param {number} id The template id.
 * @param {object} body The template body.
 * @returns {Promise<any>} Updated template.
 */
export const updateTemplateAPI = async (id, body) => axios.put(`UpdateTemplate/${id}`, body);

/**
 * Update template question from API.
 * 
 * @param {number} id The template question id.
 * @param {object} body The template question body.
 * @returns {Promise<any>} Updated/Created template question.
 */
export const updateTemplateQuestionAPI = async (id, body) => axios.put(`UpdateTemplateQuestion/${id}`, body);

/**
 * Delete template question from API.
 * 
 * @param {number} id The template question id.
 * @returns {Promise<any>}
 */
export const deleteTemplateQuestionAPI = async (id) => axios.delete(`DeleteTemplatequestion/${id}`);

/**
 * Update template question option from API.
 * 
 * @param {number} id The template question option id.
 * @param {object} body The template question option body.
 * @returns {object} Updated/Created template question option.
 */
export const updateTemplateOptionAPI = async (id, body) => axios.put(`UpdateTemplateOptions/${id}`, body);

/**
 * Delete template question option from API.
 * 
 * @param {number} id The template question option id.
 * @returns 
 */
export const deleteTemplateOptionAPI = async (id) => axios.delete(`DeleteTemplateOptions/${id}`);