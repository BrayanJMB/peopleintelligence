import axios from '../utils/axiosInstance';
/**
 * Fetch Working Day.
 *
 * @returns {Promise<any>}
 */
export const fetchWorkingDayAPI = async () => axios.get('WorkingDay/');


/**
 * Fetch Working Day by companyId.
 *
 * @returns {Promise<any>}
 */
export const fetchWorkingDayByCompanyAPI = async (idCompany) => axios.get(`WorkingDay/Company/${idCompany}`);


/**
 * Store Working Day.
 *
 * @param data
 * @returns {Promise<any>}
 */
export const storeWorkingDayAPI = async ({idCompany, ...data}) => axios.post(`WorkingDay/${idCompany}`, data);


/**
 * Update Working Day Type.
 *
 * @param id
 * @param data
 * @returns {Promise<any>}
 */
export const updateWorkingDayAPI = async ({...data}) => axios.put('WorkingDay/', data);

/**
 * Delete Working Day.
 *
 * @param id
 * @returns {Promise<any>}
 */
export const deleteWorkingDayAPI = async (id, idCompany) => axios.delete(`WorkingDay/${id}/${idCompany}`);

