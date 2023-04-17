import axios from '../utils/axiosInstance';

/**
 * Fetch Salary Type.
 *
 * @returns {Promise<any>}
 */
export const fetchSalaryTypeAPI = async () => axios.get('SalaryType/');

/**
 * Fetch Salary Type by companyId.
 *
 * @returns {Promise<any>}
 */
export const fetchSalaryTypeByCompanyAPI = async (idCompany) => axios.get(`SalaryType/Company/${idCompany}`);

/**
 * Store Salary Type.
 *
 * @param data
 * @returns {Promise<any>}
 */
export const storeSalaryTypeAPI = async ({idCompany, ...data}) => axios.post(`SalaryType/${idCompany}`, data);

/**
 * Update Salary Type.
 *
 * @param id
 * @param data
 * @returns {Promise<any>}
 */
export const updateSalaryTypeAPI = async ({...data}) => axios.put('SalaryType/', data);

/**
 * Delete Salary Type.
 *
 * @param id
 * @returns {Promise<any>}
 */
export const deleteSalaryTypeAPI = async (id, idCompany) => axios.delete(`SalaryType/${id}/${idCompany}`);


