import axios from '../utils/axiosInstance';

/**
 * Fetch EnglishLevel.
 *
 * @returns {Promise<any>}
 */
export const fetchEnglishLevelAPI = async () => axios.get('EnglishLevel/');

/**
 * Fetch EnglishLevel by companyId.
 *
 * @returns {Promise<any>}
 */
export const fetchEnglishLevelByCompanyAPI = async (idCompany) => axios.get(`EnglishLevel/Company/${idCompany}`);

/**
 * Store EnglishLevel by companyId.
 *
 * @returns {Promise<any>}
 */
export const storeEnglishLevelAPI = async ({ idCompany, ...data }) => axios.post(`EnglishLevel/${idCompany}`,  data );

/**
 * Update EnglishLevel.
 *
 * @param id
 * @param data
 * @returns {Promise<any>}
 */
export const updateEnglishLevelAPI = async ({...data}) => axios.put('EnglishLevel/', data);

/**
 * Delete EnglishLevel.
 *
 * @param id
 * @returns {Promise<any>}
 */
export const deleteEnglishLevelAPI = async (id, idCompany) => axios.delete(`EnglishLevel/${id}/${idCompany}`);
