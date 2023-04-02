import axios from '../utils/axiosInstance';

/**
 * Fetch Contract Type.
 *
 * @returns {Promise<any>}
 */
export const fetchSalaryTypeAPI = async () => axios.get('TipoSalario/');

/**
 * Update Contract Type.
 *
 * @param id
 * @param data
 * @returns {Promise<any>}
 */
export const updateSalaryTypeAPI = async ({...data}) => axios.put('TipoSalario/', data);

/**
 * Delete Contract Type.
 *
 * @param id
 * @returns {Promise<any>}
 */
export const deleteSalaryTypeAPI = async (id) => axios.delete(`TipoSalario/${id}`);

/**
 * Store Contract Type.
 *
 * @param data
 * @returns {Promise<any>}
 */
export const storeSalaryTypeAPI = async (data) => axios.post('TipoSalario/', data);
