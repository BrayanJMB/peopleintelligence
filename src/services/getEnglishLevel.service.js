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
export const fetchEnglishLevelByCompanyIdAPI = async (idCompany) => axios.get(`EnglishLevel/${idCompany}`);

/**
 * Store EnglishLevel by companyId.
 *
 * @returns {Promise<any>}
 */
export const storeEnglishLevelByCompanyIdAPI = async ({ idCompany, tipoDocumento }) => axios.post(`EnglishLevel/${idCompany}`, { tipoDocumento });

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
export const deleteEnglishLevelAPI = async (id) => axios.delete(`EnglishLevel/${id}`);

/**
 * Store EnglishLevel.
 *
 * @param data
 * @returns {Promise<any>}
 */
export const storeEnglishLevelAPI = async (data) => axios.post('EnglishLevel/', data);
