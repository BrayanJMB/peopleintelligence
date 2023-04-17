import axios from '../utils/axiosInstance';
/**
 * Fetch Education Level.
 *
 * @returns {Promise<any>}
 */
export const fetchEducationLevelAPI = async () => axios.get('EducationLevel/');

/**
 * Fetch Education Level by companyId.
 *
 * @returns {Promise<any>}
 */
export const fetchEducationLevelByCompanyAPI = async (idCompany) => axios.get(`EducationLevel/Company/${idCompany}`);


/**
 * Store Education Level.
 *
 * @param data
 * @returns {Promise<any>}
 */
export const storeEducationLevelAPI = async ({ idCompany, ...data }) => axios.post(`EducationLevel/${idCompany}`, data);

/**
 * Update Education Level.
 *
 * @param id
 * @param data
 * @returns {Promise<any>}
 */
export const updateEducationLevelAPI = async ({...data}) => axios.put('EducationLevel/', data);

/**
 * Delete Education Level.
 *
 * @param id
 * @returns {Promise<any>}
 */
export const deleteEducationLevelAPI = async (id, idCompany) => axios.delete(`EducationLevel/${id}/${idCompany}`);


